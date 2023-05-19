export const getWalletAuthKey = () => {
  if (!window) return;

  const walletAuthKey = window.localStorage.getItem("near_app_wallet_auth_key");

  if (walletAuthKey) {
    return JSON.parse(walletAuthKey)?.accountId;
  }
};
