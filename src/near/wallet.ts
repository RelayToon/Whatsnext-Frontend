/* A helper file that simplifies using the wallet selector */

// near api js
import { providers } from "near-api-js";

// wallet selector UI
import "@near-wallet-selector/modal-ui/styles.css";
import { setupModal } from "@near-wallet-selector/modal-ui";
import LedgerIconUrl from "@near-wallet-selector/ledger/assets/ledger-icon.png";
import MyNearIconUrl from "@near-wallet-selector/my-near-wallet/assets/my-near-wallet-icon.png";

// wallet selector options
import {
  WalletSelector,
  setupWalletSelector,
} from "@near-wallet-selector/core";
import { setupLedger } from "@near-wallet-selector/ledger";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { getWalletAuthKey } from "@/utils/auth";

const THIRTY_TGAS = "50000000000000";
const NO_DEPOSIT = "0";

type Network = "mainnet" | "testnet";

// Wallet that simplifies using the wallet selector
export class Wallet {
  walletSelector: WalletSelector;
  wallet: any;
  network: Network;
  createAccessKeyFor: any;
  accountId: any;
  contractId: any;

  constructor({
    createAccessKeyFor = undefined,
    network = "testnet",
  }: {
    createAccessKeyFor: string | undefined;
    network?: Network;
  }) {
    // Login to a wallet passing a contractId will create a local
    // key, so the user skips signing non-payable transactions.
    // Omitting the accountId will result in the user being
    // asked to sign all transactions.
    this.createAccessKeyFor = createAccessKeyFor;
    this.network = "testnet";
  }

  // To be called when the website loads
  async startUp() {
    this.walletSelector = await setupWalletSelector({
      network: this.network,
      modules: [
        setupMyNearWallet({ iconUrl: MyNearIconUrl.src }),
        setupLedger({ iconUrl: LedgerIconUrl.src }),
      ],
    });

    const isSignedIn = this.walletSelector.isSignedIn();

    if (isSignedIn) {
      this.wallet = await this.walletSelector.wallet();
      this.accountId =
        this.walletSelector.store.getState().accounts[0].accountId;
    }

    return isSignedIn;
  }

  // Sign-in method
  signIn() {
    const description = "Please select a wallet to sign in.";
    const modal = setupModal(this.walletSelector, {
      contractId: this.createAccessKeyFor,
      description,
    });
    modal.show();
  }

  // Sign-out method
  signOut() {
    this.wallet.signOut();
    this.wallet = this.accountId = this.createAccessKeyFor = null;
    window.location.replace(window.location.origin + window.location.pathname);
  }

  // Make a read-only call to retrieve information from the network
  async viewMethod({
    contractId,
    method,
    args = {},
  }: {
    contractId: string;
    method: string;
    args?: any;
  }) {
    const { network } = this.walletSelector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    const res: any = await provider.query({
      request_type: "call_function",
      account_id: contractId,
      method_name: method,
      args_base64: Buffer.from(JSON.stringify(args)).toString("base64"),
      finality: "optimistic",
    });
    return JSON.parse(Buffer.from(res.result).toString());
  }

  // Call a method that changes the contract's state
  async callMethod({
    contractId,
    method,
    args = {},
    gas = THIRTY_TGAS,
    deposit = NO_DEPOSIT,
  }: {
    contractId: string;
    method: string;
    args: any;
    gas?: string;
    deposit?: string;
  }) {
    // Sign a transaction with the "FunctionCall" action
    return await this.wallet.signAndSendTransaction({
      signerId: this.accountId,
      receiverId: contractId,
      actions: [
        {
          type: "FunctionCall",
          params: {
            methodName: method,
            args,
            gas,
            deposit,
          },
        },
      ],
    });
  }

  // Get transaction result from the network
  async getTransactionResult(txhash: any) {
    const { network } = this.walletSelector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    // Retrieve transaction result from the network
    const transaction = await provider.txStatus(txhash, "unnused");
    return providers.getTransactionLastResult(transaction);
  }

  async getFtBalance(contractId: string) {
    const accountId = getWalletAuthKey();

    return await this.viewMethod({
      contractId,
      method: "ft_balance_of",
      args: {
        account_id: accountId,
      },
    });
  }

  async getIsVoting(voteContractId: string, communityContractId: string) {
    return await this.viewMethod({
      contractId: voteContractId,
      method: "is_voting",
      args: {
        community_id: communityContractId,
      },
    });
  }

  async getAllProposals(voteContractId: string) {
    return await this.viewMethod({
      contractId: voteContractId,
      method: "get_all_proposals",
    });
  }

  async startVote(
    voteContractId: string,
    communityContractId: string,
    prefix: string | number
  ) {
    await this.callMethod({
      contractId: voteContractId,
      method: "new_vote",
      args: {
        prefix,
        community_id: communityContractId,
      },
    });
  }
}
