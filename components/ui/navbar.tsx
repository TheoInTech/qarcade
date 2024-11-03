"use client";

import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const Navbar = ({ className }: { className?: string }) => {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn(
        "fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 bg-black",
        className
      )}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="🎮 Play now!">
          <div className="  text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Collectible Clash"
              href="/collectible-clash"
              src="https://assets.aceternity.com/demos/algochurn.webp"
              description="Enter community raffles and expand your collection of atomic assets!"
            />
            <ProductItem
              title="Fortune Loop"
              href="/fortune-loop"
              src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
              description="Test your fortune at the daily lottery and get a chance to win a share of the community pot!"
            />
            <ProductItem
              title="Quantum Flip"
              href="/quantum-flip"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
              description="Flip the quantum coin and see if you can double your credits!"
            />
          </div>
        </MenuItem>
        <HoveredLink href="/build">🛠️ Build a Game</HoveredLink>
      </Menu>
    </div>
  );
};
