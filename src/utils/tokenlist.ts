export const TOKEN_LIST = [
  {
    "ticker": "LINK",
    "img": "https://cdn.moralis.io/eth/0x514910771af9ca656af840dff83e8264ecf986ca.png",
    "name": "Chainlink",
    "address": "0x5947BB275c521040051D82396192181b413227A3",
    "decimals": 18
  },
  {
    "ticker": "USDC",
    "img": "https://cdn.moralis.io/eth/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png",
    "name": "USD Coin",
    "address": "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    "decimals": 6
  },
  {
    "ticker": "USDT",
    "img": "https://cdn.moralis.io/eth/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
    "name": "Tether USD",
    "address": "0xc7198437980c041c805A1EDcbA50c1Ce5db95118",
    "decimals": 6
  },
  {
    "ticker": "GUSD",
    "img": "https://cdn.moralis.io/eth/0x056fd409e1d7a124bd7017459dfea2f387b6d5cd.png",
    "name": "Gemini USD",
    "address": "0x3e02C298e1eFbB90A598D5137208C4F647CF71Fb",
    "decimals": 2
  },
  {
    "ticker": "DAI",
    "img": "https://cdn.moralis.io/eth/0x6b175474e89094c44da98b954eedeac495271d0f.png",
    "name": "Dai Stablecoin",
    "address": "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70",
    "decimals": 18
  },
  {
    "ticker": "WETH",
    "img": "https://cdn.moralis.io/eth/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png",
    "name": "Wrapped Ethereum",
    "address": "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB",
    "decimals": 18
  },
  {
    "ticker": "WBTC",
    "img": "https://cdn.moralis.io/eth/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599.png",
    "name": "Wrapped Bitcoin",
    "address": "0x50b7545627a5162F82A992c33b87aDc75187B218",
    "decimals": 8
  },
  {
    "ticker": "MATIC",
    "img": "https://cdn.moralis.io/eth/0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0.png",
    "name": "Matic Token",
    "address": "0x145ad28a42bf334104610f7836d0945dffb6de63",
    "decimals": 18
  },
  {
    "ticker": "UNI",
    "img": "https://cdn.moralis.io/eth/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984.png",
    "name": "Uniswap",
    "address": "0x0b3F868E0BE5597D5DB7fEB59E1CADBb0fdDa50a",
    "decimals": 18
  },
  {
    "ticker": "CRV",
    "img": "https://cdn.moralis.io/eth/0xd533a949740bb3306d119cc777fa900ba034cd52.png",
    "name": "Curve DAO Token",
    "address": "0x249848BeCA43aC405b8102Ec90Dd5F22CA513c06",
    "decimals": 18
  },
  {
    "ticker": "MKR",
    "img": "https://cdn.moralis.io/eth/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2.png",
    "name": "Maker",
    "address": "0x2eE014d05970E001Fc30Fe68bD1D066c0D274892",
    "decimals": 18
  },
  {
    "ticker": "SHIB",
    "img": "https://cdn.moralis.io/eth/0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce.png",
    "name": "Shiba Inu",
    "address": "0x8f2654E28c1569115a6E871d4A48c7C92B7de3F2",
    "decimals": 18
  },
  {
    "ticker": "AAVE",
    "img": "https://cdn.moralis.io/eth/0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9.png",
    "name": "AAVE",
    "address": "0x63a72806098Bd3D9520cC43356dD78afe5D386D9",
    "decimals": 18
  }
] as const;

export type Coin = (typeof TOKEN_LIST)[0];
