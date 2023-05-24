import Head from "next/head";
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
