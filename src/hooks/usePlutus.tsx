import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { useAccount, useSendTransaction, useWriteContract } from "wagmi";
import { PLUTUS_ABI } from "@/assets/abis/PLUTUS_ABI";
import { Coin, TOKEN_LIST } from "@/utils/tokenlist";

export type User = {
  name: string;
  taxNumber: string;
};

type PlutusContextState = {
  user: User;
  setUser: (user: User) => void;

  selectedCoin: Coin;
  setSelectedCoin: (coin: Coin) => void;
};

const initialContext: PlutusContextState = {
  user: { name: "", taxNumber: "" },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setUser(_) { },

  selectedCoin: TOKEN_LIST[0],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSelectedCoin(_) { },
};

const PlutusContext = createContext<PlutusContextState>(initialContext);

export const PlutusProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>({ name: "", taxNumber: "" });
  const [selectedCoin, setSelectedCoin] = useState(TOKEN_LIST[0]);

  return (
    <PlutusContext.Provider
      value={{ selectedCoin, setSelectedCoin, user, setUser }}
    >
      {children}
    </PlutusContext.Provider>
  );
};

export const usePlutus = () => {
  const ctx = useContext(PlutusContext)!;
  const { writeContract } = useWriteContract();
  const { sendTransaction } = useSendTransaction();

  const account = useAccount();

  const pay = useCallback(
    async (parameters: { tokenAmount: bigint; usdcAmount: bigint }) => {
      const transaction = writeContract({
        abi: PLUTUS_ABI,
        address: import.meta.env.PLUTUS_ADDRESS,
        functionName: "swapTokensForUSDC",
        args: [
          ctx.selectedCoin.address,
          parameters.tokenAmount,
          parameters.usdcAmount,
        ],
      });
 

      return transaction;
    },
    [ctx.selectedCoin.address, writeContract]
  );

  const getQuote = useCallback(async () => {
    // const response = await Moralis.EvmApi.token.getTokenPrice({
    //   address: ctx.selectedCoin.s,
    //   chain: EvmChain.AVALANCHE,
    // });

    return 1.2;
  }, []);

  return {
    pay,
    account,
    selectedCoin: ctx.selectedCoin,
    setSelectedCoin: ctx.setSelectedCoin,
    getQuote,
    user: {
      setUser: ctx.setUser,
      user: ctx.user,
    },
  };
};
