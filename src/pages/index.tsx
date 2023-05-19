import { Wallet } from "@/near/wallet";
import { useEffect, useMemo } from "react";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_NAME;

const Home = () => {
  const wallet = useMemo(
    () => new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS }),
    []
  );

  useEffect(() => {
    (async () => {
      await wallet.startUp();
    })();
  }, [wallet]);

  return (
    <div className="flex justify-between p-4 w-full">
      <p>Relay Toon</p>
      <button
        className="text-white"
        onClick={() => {
          wallet.signIn();
        }}
      >
        sign in
      </button>
    </div>
  );
};

export default Home;
