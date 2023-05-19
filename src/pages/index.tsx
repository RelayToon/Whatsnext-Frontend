import nearStore from "@/store/nearStore";

const Home = () => {
  const { wallet } = nearStore();

  return (
    <div className="flex flex-col">
      HOME
      {wallet?.accountId ? (
        <button
          onClick={() => {
            wallet.signOut();
          }}
        >
          sign out
        </button>
      ) : (
        <button
          onClick={() => {
            wallet.signIn();
          }}
        >
          sign in
        </button>
      )}
    </div>
  );
};

export default Home;
