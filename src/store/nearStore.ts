import { create } from "zustand";

import { Wallet } from "@/near/wallet";

interface NearStore {
  wallet: any;
  isWalletStarted: boolean;
  ftBalance: number;
  init: (contractAddress?: string | undefined) => any;
  setIsWalletStarted: (isWalletStarted: boolean) => void;
  setFtBalance: (ftBalance: number) => void;
}

const nearStore = create<NearStore>((set) => ({
  wallet: undefined,
  isWalletStarted: false,
  ftBalance: 0,
  init: (contractAddress) => {
    if (!contractAddress) return;

    const wallet = new Wallet({ createAccessKeyFor: contractAddress });
    set(() => ({ wallet }));

    return wallet;
  },
  setIsWalletStarted: (isWalletStarted) => {
    set(() => ({ isWalletStarted }));
  },
  setFtBalance: (ftBalance) => {
    set(() => ({ ftBalance }));
  },
  clearFtBalance: () => {
    set(() => ({ ftBalance: 0 }));
  },
}));

export default nearStore;
