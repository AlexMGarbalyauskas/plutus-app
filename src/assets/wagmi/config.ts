import { http, createConfig } from "wagmi";
import { avalanche } from "wagmi/chains";

export const config = createConfig({
  chains: [avalanche],
  transports: {
    [avalanche.id]: http(),
  },
});
