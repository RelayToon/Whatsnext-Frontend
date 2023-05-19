import { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import nearStore from "@/store/nearStore";
import { getWalletAuthKey } from "@/utils/auth";

const Login = () => {
  const router = useRouter();
  const { wallet } = nearStore();

  useEffect(() => {
    if (getWalletAuthKey()) {
      router.replace("/");
    }
  }, [router, wallet]);

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen p-5 gap-20">
      <div className="flex flex-col items-center gap-5">
        {/* 로고 이미지로 대체 */}
        <div className="w-32 h-32 rounded-2xl bg-white" />
        <h1 className="text-center font-bold text-3xl">what’s next</h1>
      </div>
      <button
        className="flex justify-center text-white rounded-lg border border-white w-full py-4"
        onClick={() => {
          wallet.signIn();
        }}
      >
        <Image
          src="/images/near-logo.svg"
          width={80}
          height={20}
          alt="near-logo"
        />
      </button>
    </div>
  );
};

export default Login;
