"use client";

import { AssetCard } from "@/components/ui/asset-card";
import { BtnBorderMagic } from "@/components/ui/buttons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const FilterTabs = () => {
  return (
    <Tabs defaultValue="featured" className="w-full">
      <div className="flex w-full items-center gap-4 justify-between">
        <TabsList className="">
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        <BtnBorderMagic onClick={() => alert("Create raffle")}>
          Create Raffle
        </BtnBorderMagic>
      </div>
      <TabsContent value="featured">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
          {[...Array(8)].map((_, index) => (
            <AssetCard
              key={`${index}-featured`}
              src={
                "https://arweave.net/fEiy_gTaTDYvSDkOsGPoOz0c9J8xvVCIZ7y3mI4IpE8"
              }
              name={`Dumdums #${index + 1}`}
              collection={"Dumdums"}
              floorPrice={5}
              raffleEndsIn={1704067200000}
              pricePerTicket={0.1}
              raffler={"theointech"}
              ticketsRemaining={49}
              ticketsOverall={69}
            />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="ongoing">Ongoing</TabsContent>
      <TabsContent value="past">Past</TabsContent>
    </Tabs>
  );
};
