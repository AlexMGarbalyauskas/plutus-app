/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly PLUTUS_ADDRESS: `0x${string}`;
  readonly MORALIS_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
