import { create } from "zustand";

import { Wallet } from "@/near/wallet";

interface NearStore {
  wallet: any;
  isWalletStarted: boolean;
  ftBalance: number;
  init: (contractId?: string | undefined) => any;
  initFtBalance: (contractId: string) => void;
  setIsWalletStarted: (isWalletStarted: boolean) => void;
  setFtBalance: (ftBalance: number) => void;
  clearFtBalance: () => void;
}

const nearStore = create<NearStore>((set, get) => ({
  wallet: undefined,
  isWalletStarted: false,
  ftBalance: 0,
  init: (contractId) => {
    if (!contractId) return;

    const wallet = new Wallet({ createAccessKeyFor: contractId });
    set(() => ({ wallet }));

    return wallet;
  },
  setIsWalletStarted: (isWalletStarted) => {
    set(() => ({ isWalletStarted }));
  },
  initFtBalance: async (contractId: string) => {
    const ftBalance = await get().wallet.getFtBalance(contractId);
    set(() => ({ ftBalance }));
  },
  setFtBalance: (ftBalance) => {
    set(() => ({ ftBalance }));
  },
  clearFtBalance: () => {
    set(() => ({ ftBalance: 0 }));
  },
}));

export default nearStore;
