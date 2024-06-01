export const PLUTUS_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenIn",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountOutMin",
        type: "uint256",
      },
    ],
    name: "swapTokensForUSDC",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
