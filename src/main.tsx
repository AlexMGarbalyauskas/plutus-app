import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Routes } from "./Routes.tsx";
import { WagmiProvider } from "wagmi";
import { config } from "./assets/wagmi/config.ts";
import { PlutusProvider } from "./hooks/usePlutus.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <PlutusProvider>
        <Routes />
      </PlutusProvider>
    </WagmiProvider>
  </React.StrictMode>
);
