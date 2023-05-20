import type { AppProps } from "next/app";
import { useEffect } from "react";

import "@/styles/globals.css";
import nearStore from "@/store/nearStore";
import { getWalletAuthKey } from "@/utils/auth";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_NAME;

const App = ({ Component, pageProps }: AppProps) => {
  const { init, setIsWalletStarted, setFtBalance } = nearStore();

  const viewFtToken = async (wallet: any) => {
    const authKey = getWalletAuthKey();
    if (!authKey) return;

    return wallet.viewMethod({
      contractId: CONTRACT_ADDRESS,
      method: "ft_balance_of",
      args: {
        account_id: getWalletAuthKey(),
      },
    });
  };

  useEffect(() => {
    const wallet = init(CONTRACT_ADDRESS);

    (async () => {
      try {
        await wallet?.startUp();
        setIsWalletStarted(true);

        const ftBalance = await viewFtToken(wallet);
        setFtBalance(ftBalance);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [init, setFtBalance, setIsWalletStarted]);

  return <Component {...pageProps} />;
};

export default App;
