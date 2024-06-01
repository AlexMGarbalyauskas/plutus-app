import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAccount, useWriteContract } from "wagmi";
import { PLUTUS_ABI } from "@/assets/abis/PLUTUS_ABI";
import { Coin, TOKEN_LIST } from "@/utils/tokenlist";
import axios from "axios";
import { Address } from "viem";

export type User = {
  name: string;
  taxNumber: string;
  amountToPay: number;
};

type PlutusContextState = {
  user: User;
  setUser: (user: User) => void;

  selectedCoin: Coin;
  setSelectedCoin: (coin: Coin) => void;

  tickers: AlternativeTicker[];
};

const initialContext: PlutusContextState = {
  user: { name: "", taxNumber: "", amountToPay: 0 },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setUser(_) {},

  selectedCoin: TOKEN_LIST[0],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSelectedCoin(_) {},

  tickers: [],
};

const PlutusContext = createContext<PlutusContextState>(initialContext);

export const PlutusProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>({
    name: "",
    taxNumber: "",
    amountToPay: 0,
  });
  const [selectedCoin, setSelectedCoin] = useState<Coin>(TOKEN_LIST[0]);
  const [tickers, setTickers] = useState<AlternativeTicker[]>([]);

  const fetchPrices = useCallback(async () => {
    const res = await axios.get<AlternativeTicker[]>(
      "https://corsproxy.io/?https://api.alternative.me/v1/ticker/"
    );

    setTickers(res.data);
  }, []);

  useEffect(() => {
    if (tickers.length === 0) {
      fetchPrices();
    }
  }, [fetchPrices, tickers.length]);

  return (
    <PlutusContext.Provider
      value={{ selectedCoin, setSelectedCoin, user, setUser, tickers }}
    >
      {children}
    </PlutusContext.Provider>
  );
};

type AlternativeTicker = {
  id: string;
  name: string;
  symbol: string;
  rank: string;
  price_usd: string;
  price_btc: string;
  "24h_volume_usd": string;
  market_cap_usd: string;
  available_supply: string;
  total_supply: string;
  max_supply: string;
  percent_change_1h: string;
  percent_change_24h: string;
  percent_change_7d: string;
  last_updated: string;
};

export const usePlutus = () => {
  const ctx = useContext(PlutusContext)!;
  const { writeContractAsync } = useWriteContract();

  const account = useAccount();

  const pay = useCallback(
    async (parameters: { tokenAmount: bigint; usdcAmount: bigint }) => {
      console.log("account", account.address);
      console.log("parameters", parameters);

      console.log("token address", ctx.selectedCoin.address);

      console.log("address", import.meta.env.VITE_PLUTUS_ADDRESS);
      const transaction = await writeContractAsync({
        abi: PLUTUS_ABI,
        address: import.meta.env.VITE_PLUTUS_ADDRESS,
        functionName: "swapTokensForUSDC",
        args: [
          ctx.selectedCoin.address as Address,
          parameters.tokenAmount,
          parameters.usdcAmount,
        ],
      });

      return transaction;
    },
    [ctx.selectedCoin.address, writeContractAsync]
  );

  const getQuote = useCallback(async () => {
    const parsedSymbol = ctx.selectedCoin.ticker.startsWith("W")
      ? ctx.selectedCoin.ticker.slice(1)
      : ctx.selectedCoin.ticker;
    // find inside tickers

    console.log("parsedSymbol", parsedSymbol);

    console.log("tickers", ctx.tickers);
    const quote = ctx.tickers.find((ticker) => ticker.symbol === parsedSymbol);

    console.log("quote", quote);

    return Number(quote!.price_usd) * 0.9;
  }, [ctx.selectedCoin.ticker, ctx.tickers]);

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
