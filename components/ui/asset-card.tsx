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
  onClick?: () => void;
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
  onClick,
}: IAssetCard) => {
  return (
    <div className={cn("w-full group/card", className)}>
      <div
        onClick={onClick}
        style={{ backgroundImage: `url(${src})` }}
        className={cn(
          "cursor-pointer overflow-hidden relative card h-96 rounded-2xl shadow-xl max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4",
          "bg-cover"
        )}
      >
        <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
        <div className="flex flex-row items-center space-x-4 z-10">
          <div className="flex flex-col">
            <p className="font-normal text-base text-gray-50 relative z-10">
              By {raffler}
            </p>
            <p className="text-sm text-gray-300">aw2...sdo</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <h1 className="text-left font-bold text-xl md:text-2xl text-gray-50 relative z-10">
              {name}
            </h1>
            <p className="text-left font-normal text-sm text-gray-50 relative z-10">
              {collection}
            </p>
          </div>
          <div className="flex flex-col bg-black/80 p-4 rounded-lg gap-2">
            <div className="flex flex-row items-center justify-between font-normal text-xs text-gray-50 relative z-10">
              <span>Ends in: {raffleEndsIn}</span>
              <span>{pricePerTicket} qAR / ticket</span>
            </div>
            <div className="flex flex-row items-center justify-between font-normal text-xs text-gray-50 relative z-10">
              <span>FP: {floorPrice} qAR</span>
              <span>
                {ticketsRemaining} / {ticketsOverall} tickets left
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
