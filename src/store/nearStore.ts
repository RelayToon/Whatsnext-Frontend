import { create } from "zustand";

import { Wallet } from "@/near/wallet";

interface NearStore {
  wallet: any;
  isWalletStarted: boolean;
  init: (contractAddress: string | undefined) => any;
  setIsWalletStarted: (isWalletStarted: boolean) => void;
}

const nearStore = create<NearStore>((set) => ({
  wallet: undefined,
  isWalletStarted: false,
  init: (contractAddress) => {
    if (!contractAddress) return;

    const wallet = new Wallet({ createAccessKeyFor: contractAddress });
    set(() => ({ wallet }));

    return wallet;
  },
  setIsWalletStarted: (isWalletStarted) => {
    set(() => ({ isWalletStarted }));
  },
}));

export default nearStore;
