import type { AppProps } from "next/app";
import { useEffect } from "react";

import "@/styles/globals.css";
import nearStore from "@/store/nearStore";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_NAME;

const App = ({ Component, pageProps }: AppProps) => {
  const { init, setIsWalletStarted } = nearStore();

  useEffect(() => {
    const wallet = init(CONTRACT_ADDRESS);

    (async () => {
      try {
        await wallet.startUp();
        setIsWalletStarted(true);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [init, setIsWalletStarted]);

  return <Component {...pageProps} />;
};

export default App;
