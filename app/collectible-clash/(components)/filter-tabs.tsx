"use client";

import {
  CreateRaffleModal,
  JoinRaffleModal,
} from "@/app/collectible-clash/(components)";
import { AssetCard } from "@/components/ui/asset-card";
import { BtnBorderMagic } from "@/components/ui/buttons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFetchRaffles } from "@/hooks/useFetchRaffles";
import { shortenAddress } from "@/lib/utils";

export const FilterTabs = () => {
  const { data: raffles } = useFetchRaffles();

  return (
    <Tabs defaultValue="featured" className="w-full">
      <div className="flex w-full items-center gap-4 justify-between">
        <TabsList className="">
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        <CreateRaffleModal>
          <BtnBorderMagic>Create Raffle</BtnBorderMagic>
        </CreateRaffleModal>
      </div>
      <TabsContent value="featured">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
          {!!raffles && raffles.length > 0 ? (
            raffles.map((raffle, index) => {
              const asset = {
                id: raffle.Asset,
                src: `https://arweave.net/${raffle.Asset}`,
                name: shortenAddress(raffle.Asset),
                collection: "Dumdums",
                floorPrice: 5,
                raffleEndsIn: raffle.EndDate,
                pricePerTicket: raffle.Price,
                raffler: raffle.Creator,
                ticketsRemaining: raffle.Tickets - raffle.TicketsSold,
                ticketsOverall: raffle.Tickets,
              };

              return (
                <JoinRaffleModal key={`asset-${index}`} asset={asset}>
                  <AssetCard {...asset} />
                </JoinRaffleModal>
              );
            })
          ) : (
            <div className="w-full h-full flex">
              <p>No ongoing raffles</p>
            </div>
          )}
        </div>
      </TabsContent>
      <TabsContent value="ongoing">Ongoing</TabsContent>
      <TabsContent value="past">Past</TabsContent>
    </Tabs>
  );
};
