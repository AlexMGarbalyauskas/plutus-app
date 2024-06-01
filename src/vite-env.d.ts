/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PLUTUS_ADDRESS: `0x${string}`;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
