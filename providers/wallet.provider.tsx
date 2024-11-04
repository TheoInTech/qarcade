"use client";

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
  return (
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
  );
};
