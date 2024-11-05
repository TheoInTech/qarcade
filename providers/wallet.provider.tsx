"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppInfo, PermissionType } from "arconnect";
import { ArweaveWalletKit } from "arweave-wallet-kit";
import { ReactNode } from "react";

const WALLET_PERMISSIONS: PermissionType[] = [
  "ACCESS_ADDRESS",
  "ACCESS_PUBLIC_KEY",
  "DISPATCH",
  "SIGNATURE",
  "SIGN_TRANSACTION",
];

const APP_INFO: AppInfo = {
  name: "qARCade",
};

interface IWalletProvider {
  children: ReactNode;
}

export const WalletProvider = ({ children }: IWalletProvider) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 60, // 1hr
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ArweaveWalletKit
        config={{
          ensurePermissions: true,
          permissions: WALLET_PERMISSIONS,
          appInfo: APP_INFO,
        }}
        theme={{
          displayTheme: "dark",
          radius: "minimal",
          titleHighlight: { r: 0, g: 0, b: 0 },
        }}
      >
        {children}
      </ArweaveWalletKit>
    </QueryClientProvider>
  );
};
