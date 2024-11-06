"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import { LiveCountdown } from "@/components/ui/live-countdown";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

export interface IAsset {
  id: number;
  src: string;
  name: string;
  collection: string;
  floorPrice: number;
  raffleEndsIn: number;
  pricePerTicket: number;
  raffler: string;
  ticketsRemaining: number;
  ticketsOverall: number;
}

interface IJoinRaffleModal {
  children: React.ReactNode;
  asset: IAsset;
}

interface IAssetPill {
  children: React.ReactNode;
  className?: string;
}

const AssetPill = ({ children, className }: IAssetPill) => {
  return (
    <p className={cn("text-sm px-4 py-2 rounded-full", className)}>
      {children}
    </p>
  );
};

export const JoinRaffleModal = ({ children, asset }: IJoinRaffleModal) => {
  const [tickets, setTickets] = useState(1);

  const handleTicketsChange = (value: number[]) => {
    setTickets(value[0]);
  };

  const handleBuyTickets = () => {
    alert(`Buy ${tickets} tickets`);
  };

  return (
    <Modal>
      <ModalTrigger>{children}</ModalTrigger>
      <ModalBody>
        <ModalContent>
          {asset ? (
            <div className="grid grid-cols-12 gap-4">
              <div className="relative col-span-6 flex justify-center items-center">
                <Image
                  src={asset.src}
                  alt={asset.name}
                  width={1000}
                  height={1000}
                  className="rounded-lg h-[400px] w-full object-cover"
                />
              </div>
              <div className="col-span-6 flex flex-col gap-4 p-2">
                <h2 className="text-4xl font-bold">{asset.name}</h2>
                <div className="flex gap-4">
                  <p>Collection: {asset.collection}</p>|
                  <p>Raffler: {asset.raffler}</p>
                </div>
                <LiveCountdown endDate={asset.raffleEndsIn} showSeconds />
                <div className="flex gap-4">
                  <AssetPill className="bg-primary/50">
                    {asset.pricePerTicket} qAR per ticket
                  </AssetPill>
                  <AssetPill className="bg-secondary/50">
                    Tickets: {asset.ticketsRemaining}/{asset.ticketsOverall}
                  </AssetPill>
                  <AssetPill className="bg-accent/50">
                    FP: {asset.floorPrice} qAR
                  </AssetPill>
                </div>
                <div className="mt-8 flex flex-col gap-4">
                  <Slider
                    defaultValue={[1]}
                    min={1}
                    max={asset.ticketsRemaining}
                    step={1}
                    onValueChange={handleTicketsChange}
                  />
                  <button
                    onClick={handleBuyTickets}
                    className="shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3] rounded-md text-white font-light transition duration-200 ease-linear"
                  >
                    Buy {tickets} {tickets > 1 ? "tickets" : "ticket"}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>No asset selected</div>
          )}
        </ModalContent>
      </ModalBody>
    </Modal>
  );
};
