import { useCallback, useMemo } from "react";
import { useAccount, useWalletClient } from "wagmi";
import { getContract } from "viem";
import { PLUTUS_ABI } from "@/assets/abis/PLUTUS_ABI";

const usePlutus = () => {
  const client = useWalletClient();
  const account = useAccount();

  const contract = useMemo(() => {
    if (account.address) {
      return getContract({
        abi: PLUTUS_ABI,
        address: import.meta.env.PLUTUS_ADDRESS,
        client: client.data,
      });
    }

    return null;
  }, [client, account]);

  const pay = useCallback(() => {}, []);

  return { account };
};
