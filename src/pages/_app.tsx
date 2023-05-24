import Head from "next/head";
import type { AppProps } from "next/app";
import { useCallback, useEffect } from "react";

import "@/styles/globals.css";
import nearStore from "@/store/nearStore";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_NAME;

const App = ({ Component, pageProps }: AppProps) => {
  const { init, setIsWalletStarted, setFtBalance } = nearStore();

  const initApp = useCallback(async () => {
    const wallet = init(CONTRACT_ADDRESS);

    try {
      await wallet?.startUp();
      setIsWalletStarted(true);
    } catch (e) {
      console.error(e);
    }
  }, [init, setIsWalletStarted]);

  useEffect(() => {
    initApp();
  }, [initApp]);

  return (
    <>
      <Head>
        <title>Whats Next</title>
        <meta
          name="description"
          content="AI Vote Toon App with Near Protocol"
        />
        <link rel="icon" href="/svgs/next-logo.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="Web3, AI-Image, Vote, Near, Coummunity"
        />
        <meta name="og:site_name" content="Whats Next" />
        <meta name="og:title" content="AI Toon App" />
        <meta
          name="og:description"
          content="A webtoon community that combines AI image generation and a voting system using near protocol"
        />
        <meta name="og:url" content="https://whats-next-demo.vercel.app" />
        <meta name="og:type" content="website" />
        <meta name="og:image" content="/svgs/next-logo.svg" />
      </Head>

      <Component {...pageProps} />
    </>
  );
};

export default App;
