import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/globals.css";
import { Routes } from "./Routes.tsx";
import { WagmiProvider } from "wagmi";
import { config } from "./assets/wagmi/config.ts";
import { PlutusProvider } from "./hooks/usePlutus.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <PlutusProvider>
            <Routes />
            <Toaster />
          </PlutusProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
