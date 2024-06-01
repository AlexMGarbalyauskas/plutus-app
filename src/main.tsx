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

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <PlutusProvider>
          <Routes />
          <Toaster />
        </PlutusProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
