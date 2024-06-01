import { useCallback, useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { PLUTUS_ABI } from "@/assets/abis/PLUTUS_ABI";
import { TOKEN_LIST } from "@/utils/tokenlist";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";

Moralis.start({
  apiKey: import.meta.env.MORALIS_KEY,
});

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

  const getQuote = useCallback(async () => {
    const response = await Moralis.EvmApi.token.getTokenPrice({
      address: selectedCoin.address,
      chain: EvmChain.AVALANCHE,
    });

    return response.result.usdPrice;
  }, [selectedCoin.address]);

  return { pay, account, selectedCoin, setSelectedCoin, getQuote };
};
