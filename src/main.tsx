import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Routes } from "./Routes.tsx";
import { WagmiProvider } from "wagmi";
import { config } from "./assets/wagmi/config.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <Routes />
    </WagmiProvider>
  </React.StrictMode>
);
