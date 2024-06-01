/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly PLUTUS_ADDRESS: `0x${string}`;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
