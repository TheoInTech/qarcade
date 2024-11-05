import { FilterTabs } from "@collectible-clash/(components)";

const CollectibleClashPage = () => {
  return (
    <div className="py-32 px-16">
      <div className="flex flex-col h-screen gap-8">
        <h1 className="text-2xl font-bold">Collectible Clash</h1>
        <FilterTabs />
      </div>
    </div>
  );
};

export default CollectibleClashPage;
