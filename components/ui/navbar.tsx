"use client";

import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { ConnectButton } from "arweave-wallet-kit";
import { useState } from "react";

export const Navbar = ({ className }: { className?: string }) => {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn(
        "fixed top-10 inset-x-0 max-w-3xl mx-auto z-50 ",
        className
      )}
    >
      <Menu setActive={setActive}>
        <HoveredLink href="/">
          <span className="font-orbitron font-bold">qARCade</span>
        </HoveredLink>
        <MenuItem setActive={setActive} active={active} item="🎮 Play now!">
          <div className="  text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Collectible Clash"
              href="/collectible-clash"
              src=""
              description="Enter community raffles and expand your collection of atomic assets!"
            />
            <ProductItem
              title="Fortune Loop"
              href="/fortune-loop"
              src=""
              description="Test your fortune at the daily lottery and get a chance to win a share of the community pot!"
            />
            <ProductItem
              title="Quantum Flip"
              href="/quantum-flip"
              src=""
              description="Flip the quantum coin and see if you can double your credits!"
            />
          </div>
        </MenuItem>
        <HoveredLink href="/build">🛠️ Build a Game</HoveredLink>
        <ConnectButton accent="#1A1A1A00" className="fixed top-2 right-2 " />
      </Menu>
    </div>
  );
};
