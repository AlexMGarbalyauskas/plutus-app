import { useCallback, useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { PLUTUS_ABI } from "@/assets/abis/PLUTUS_ABI";
import { TOKEN_LIST } from "@/utils/tokenlist";

export const usePlutus = () => {
  const { writeContract } = useWriteContract();

  const [selectedCoin, setSelectedCoin] = useState(TOKEN_LIST[0]);

  const account = useAccount();

  const pay = useCallback(
    (parameters: { tokenAmount: bigint; usdcAmount: bigint }) => {
      const transaction = writeContract({
        abi: PLUTUS_ABI,
        address: import.meta.env.PLUTUS_ADDRESS,
        functionName: "swapTokensForUSDC",
        args: [
          selectedCoin.address,
          parameters.tokenAmount,
          parameters.usdcAmount,
        ],
      });

      return transaction;
    },
    [selectedCoin.address, writeContract]
  );

  const getQuote = useCallback((parameters: { usdcAmount: bigint }) => {
    return Math.random() + Number(parameters.usdcAmount);
  }, []);

  return { pay, account, selectedCoin, setSelectedCoin, getQuote };
};
