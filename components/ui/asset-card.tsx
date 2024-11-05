import { cn } from "@/lib/utils";

interface IAssetCard {
  className?: string;
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

export const AssetCard = ({
  className,
  src,
  name,
  collection,
  floorPrice,
  raffleEndsIn,
  pricePerTicket,
  raffler,
  ticketsRemaining,
  ticketsOverall,
}: IAssetCard) => {
  return (
    <div className={cn("max-w-xs w-full group/card", className)}>
      <div
        className={cn(
          "cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl  max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4",
          `bg-[url(${src})] bg-cover`
        )}
      >
        <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
        <div className="flex flex-row items-center space-x-4 z-10">
          {/* <Image
            height="100"
            width="100"
            alt="Avatar"
            src="/manu.png"
            className="h-10 w-10 rounded-full border-2 object-cover"
          /> */}
          <div className="flex flex-col">
            <p className="font-normal text-base text-gray-50 relative z-10">
              By {raffler}
            </p>
            <p className="text-sm text-gray-400">2 min read</p>
          </div>
        </div>
        <div className="text content">
          <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10">
            {name}
          </h1>
          <p className="font-normal text-sm text-gray-50 relative z-10 my-4">
            {collection}
          </p>
          <hr className="border-gray-500 mt-4" />
          <p className="flex flex-row items-center justify-between font-normal text-xs text-gray-50 relative z-10 my-4">
            <span>Ends in: {raffleEndsIn}</span>
            <span>FP: {floorPrice} qAR</span>
          </p>
          <p className="flex flex-row items-center justify-between font-normal text-xs text-gray-50 relative z-10 my-4">
            <span>{pricePerTicket} qAR / ticket</span>
            <span>
              {ticketsRemaining} / {ticketsOverall} tickets left
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};