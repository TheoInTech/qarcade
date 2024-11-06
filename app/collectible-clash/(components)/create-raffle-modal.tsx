"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useCreateRaffle } from "@/hooks/useCreateRaffle";
import { useFetchAssets } from "@/hooks/useFetchAssets";
import { cn, shortenAddress } from "@/lib/utils";
import { useState } from "react";

interface ICreateRaffleModal {
  children: React.ReactNode;
}

interface IAssetCard {
  onClick: (id: string) => void;
  id: string;
  src: string;
  name: string;
  // collection: string;
  selected: boolean;
}

const AssetCard = ({
  onClick,
  id,
  src,
  name,
  // collection,
  selected,
}: IAssetCard) => {
  const handleClick = () => {
    onClick(id);
  };

  return (
    <div className={"w-full group/card"}>
      <div
        onClick={handleClick}
        style={{ backgroundImage: `url(${src})` }}
        className={cn(
          "cursor-pointer overflow-hidden relative card h-56 rounded-2xl shadow-xl max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4",
          "bg-cover",
          selected && "border-2 border-blue-500"
        )}
      >
        <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <h5 className="text-left font-bold text-sm md:text-base text-gray-50 relative z-10">
              {shortenAddress(name)}
            </h5>
            {/* <p className="text-left font-normal text-sm text-gray-50 relative z-10">
              {collection}
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export const CreateRaffleModal = ({ children }: ICreateRaffleModal) => {
  const { data: fetchedAssets } = useFetchAssets();
  const { mutate: createRaffle, isPending } = useCreateRaffle();

  const [tickets, setTickets] = useState(1);
  const [endDate, setEndDate] = useState<number | null>(null);
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const [price, setPrice] = useState<number>(0.1);
  const handleTicketsChange = (value: number[]) => {
    setTickets(value[0]);
  };
  const submitDisabled =
    !selectedAssetId || tickets < 1 || !endDate || !price || isPending;

  const handleCreateRaffle = () => {
    if (submitDisabled) return;

    createRaffle({
      assetId: selectedAssetId,
      tickets,
      price,
      endDate: Math.floor(Date.now() / 1000),
    });
  };

  const handleDateTimeChange = (timestamp: number | null) => {
    setEndDate(timestamp);
  };

  const handleAssetClick = (id: string) => {
    setSelectedAssetId(id);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value ? parseFloat(e.target.value) : 0);
  };

  return (
    <Modal>
      <ModalTrigger>{children}</ModalTrigger>
      <ModalBody>
        <ModalContent>
          <h1 className="text-left font-bold text-xl md:text-2xl text-gray-50 relative z-10">
            Create a raffle
          </h1>
          {!!fetchedAssets && fetchedAssets.length > 0 ? (
            <>
              <div className="mt-8 text-left font-normal text-xl text-gray-50 relative z-10">
                Select an asset
              </div>
              <div className="mt-4 flex flex-col gap-4 ">
                <div className="grid grid-cols-4 gap-4 h-[400px] p-4 overflow-y-auto w-full border border-gray-800 rounded-md">
                  {fetchedAssets.map((assetId) => {
                    const asset = {
                      id: assetId.toString(),
                      src: `https://arweave.net/${assetId}`,
                      name: `${assetId}`,
                      // collection: "${assetId}",
                    };

                    return (
                      <AssetCard
                        key={`asset-${assetId}`}
                        {...asset}
                        onClick={handleAssetClick}
                        selected={selectedAssetId === asset.id}
                      />
                    );
                  })}
                </div>
                <div className="flex gap-8">
                  <div className="flex flex-col gap-2 min-w-80">
                    <p className="text-base font-light">
                      {tickets.toLocaleString()}{" "}
                      {tickets > 1 ? "tickets" : "ticket"}
                    </p>
                    <Slider
                      defaultValue={[1]}
                      min={1}
                      max={10000}
                      step={1}
                      onValueChange={handleTicketsChange}
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-2">
                    <Label htmlFor="price">Ticket price (in qAR)</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="0.1 qAR"
                      min={0.1}
                      value={price}
                      onChange={handlePriceChange}
                    />
                  </div>
                </div>
                <DateTimePicker onDateTimeChange={handleDateTimeChange} />
                <button
                  onClick={handleCreateRaffle}
                  className="shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3] rounded-md text-white font-light transition duration-200 ease-linear"
                  disabled={submitDisabled}
                >
                  Create raffle
                </button>
              </div>
            </>
          ) : (
            <div className="my-8 flex text-xl h-40 justify-center items-center text-center text-gray-50">
              No assets found
            </div>
          )}
        </ModalContent>
      </ModalBody>
    </Modal>
  );
};
