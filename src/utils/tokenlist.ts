export const TOKEN_LIST = [
  {
    ticker: "AVAX",
    img: "https://cdn.routescan.io/_next/image?url=https%3A%2F%2Fcms-cdn.avascan.com%2Fcms2%2Favax_32.c6f54294f728.png&w=16&q=100",
    name: "Avalanche",
    address: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
    decimals: 18,
  },
  {
    ticker: "LINK",
    img: "https://cdn.moralis.io/eth/0x514910771af9ca656af840dff83e8264ecf986ca.png",
    name: "Chainlink",
    address: "0x5947BB275c521040051D82396192181b413227A3",
    decimals: 18,
  },
  {
    ticker: "WETH",
    img: "https://cdn.moralis.io/eth/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png",
    name: "Wrapped Ethereum",
    address: "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB",
    decimals: 18,
  },
  {
    ticker: "WBTC",
    img: "https://cdn.moralis.io/eth/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599.png",
    name: "Wrapped Bitcoin",
    address: "0x50b7545627a5162F82A992c33b87aDc75187B218",
    decimals: 8,
  },
  {
    ticker: "CRV",
    img: "https://cdn.moralis.io/eth/0xd533a949740bb3306d119cc777fa900ba034cd52.png",
    name: "Curve DAO Token",
    address: "0x249848BeCA43aC405b8102Ec90Dd5F22CA513c06",
    decimals: 18,
  },
  {
    ticker: "AAVE",
    img: "https://cdn.moralis.io/eth/0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9.png",
    name: "AAVE",
    address: "0x63a72806098Bd3D9520cC43356dD78afe5D386D9",
    decimals: 18,
  },
] as const;

export const QUOTE_TOKEN = {
  ticker: "USDC",
  img: "https://cdn.moralis.io/eth/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png",
  name: "USD Coin",
  address: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
  decimals: 6,
};

export type Coin = {
  ticker: string;
  img: string;
  name: string;
  address: string;
  decimals: number;
};
