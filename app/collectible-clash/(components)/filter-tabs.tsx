import { AssetCard } from "@/components/ui/asset-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const FilterTabs = () => {
  return (
    <Tabs defaultValue="featured" className="w-80">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="featured">Featured</TabsTrigger>
        <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
        <TabsTrigger value="past">Past</TabsTrigger>
      </TabsList>
      <TabsContent value="featured">
        <AssetCard
          src={
            "https://arweave.net/fEiy_gTaTDYvSDkOsGPoOz0c9J8xvVCIZ7y3mI4IpE8"
          }
          name={"y00ts"}
          collection={"y00ts"}
          floorPrice={5}
          raffleEndsIn={1704067200000}
          pricePerTicket={0.1}
          raffler={"theointech"}
          ticketsRemaining={49}
          ticketsOverall={69}
        />
      </TabsContent>
      <TabsContent value="ongoing">Ongoing</TabsContent>
      <TabsContent value="past">Past</TabsContent>
    </Tabs>
  );
};
