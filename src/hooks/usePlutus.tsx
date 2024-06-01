import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { useAccount, useWatchContractEvent, useWriteContract } from "wagmi";
import { PLUTUS_ABI } from "@/assets/abis/PLUTUS_ABI";
import { Coin, QUOTE_TOKEN, TOKEN_LIST } from "@/utils/tokenlist";
import axios from "axios";

export type User = {
  name: string;
  taxNumber: string;
};

export type Payment = {
  name: string;
  tokenAmount: bigint;
  usdcAmount: bigint;
};

type PlutusContextState = {
  user: User;
  setUser: (user: User) => void;

  selectedCoin: Coin;
  setSelectedCoin: (coin: Coin) => void;

  payments: Payment[];
};

const initialContext: PlutusContextState = {
  user: { name: "", taxNumber: "" },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setUser(_) { },

  selectedCoin: TOKEN_LIST[0],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSelectedCoin(_) { },

  payments: [],
};

const PlutusContext = createContext<PlutusContextState>(initialContext);

export const PlutusProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>({ name: "", taxNumber: "" });
  const [selectedCoin, setSelectedCoin] = useState(TOKEN_LIST[0]);

  const [payments, setPayments] = useState<Payment[]>([]);

  useWatchContractEvent({
    address: import.meta.env.PLUTUS_ADDRESS,
    abi: PLUTUS_ABI,
    eventName: "Payment",
    onLogs(logs) {
      const payment = logs.map((log) => {
        const [name, tokenAmount, usdcAmount] = log.data; // TODO type with correct
        return { name, tokenAmount, usdcAmount };
      });

      console.log(payment);

      // setPayments((prev) => [...payment.reverse(), ...prev]); // TODO add correct type
      setPayments([]);
    },
  });

  return (
    <PlutusContext.Provider
      value={{ selectedCoin, setSelectedCoin, user, setUser, payments }}
    >
      {children}
    </PlutusContext.Provider>
  );
};

export const usePlutus = () => {
  const ctx = useContext(PlutusContext)!;
  const { writeContractAsync } = useWriteContract();

  const account = useAccount();

  const pay = useCallback(
    async (parameters: { tokenAmount: bigint; usdcAmount: bigint }) => {
      const transaction = await writeContractAsync({
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
    [ctx.selectedCoin.address, writeContractAsync]
  );

  const getQuote = useCallback(async () => {
    // const response = await Moralis.EvmApi.token.getTokenPrice({
    //   address: ctx.selectedCoin.s,
    //   chain: EvmChain.AVALANCHE,
    // });

    const { data } = await axios.get<{
      tokenOne: number;
      tokenTwo: number;
      ratio: number;
    }>("https://swap-5qdn.onrender.com/tokenPrice", {
      params: {
        addressOne: ctx.selectedCoin.address,
        addressTwo: QUOTE_TOKEN.address,
      },
    });

    return data.ratio;
  }, [ctx.selectedCoin.address]);

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
