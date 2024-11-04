import { readHandler } from "@/api";
import { DEFAULTS } from "@/lib/config";
import {
  AssetSortType,
  CollectionDetailType,
  CollectionMetricsType,
  CollectionResponseType,
  CollectionType,
  OrderbookEntryType,
} from "@/lib/types";

export async function getCollectionById(args: {
  id: string;
}): Promise<CollectionDetailType | null> {
  try {
    const response = (await readHandler({
      processId: args.id,
      action: "Info",
    })) as unknown as CollectionResponseType;

    if (response) {
      const collection: CollectionType = {
        id: args.id,
        title: response.Name,
        description: response.Description,
        creator: response.Creator,
        dateCreated: response.DateCreated,
        banner: response.Banner ?? DEFAULTS.banner,
        thumbnail: response.Thumbnail ?? DEFAULTS.thumbnail,
      };

      const assetIds: string[] = response.Assets;

      const metrics: CollectionMetricsType = {
        assetCount: assetIds.length,
        // floorPrice: getFloorPrice(assetIds),
        // defaultCurrency: getDefaultCurrency(assetIds),
      };

      const collectionDetail = {
        ...collection,
        assetIds: assetIds,
        creatorProfile: null, // Async fetch from component level
        metrics: metrics,
      };
      return collectionDetail;
    }

    return null;
  } catch (e: any) {
    throw new Error(e.message || "Failed to fetch collection");
  }
}

// TODO: Use this to display the floor price of an asset upon creating and joining a raffle
// function getFloorPrice(assetIds: string[]): number {
//   if (store.getState().ucmReducer) {
//     const ucmReducer = store.getState().ucmReducer;
//     if (ucmReducer.Orderbook && ucmReducer.Orderbook.length) {
//       const filteredEntries: OrderbookEntryType[] = ucmReducer.Orderbook.filter(
//         (entry: OrderbookEntryType) => assetIds.includes(entry.Pair[0])
//       );
//       const sortedEntries: OrderbookEntryType[] = sortOrderbookEntries(
//         filteredEntries,
//         "low-to-high"
//       );
//       if (sortedEntries && sortedEntries.length) {
//         const currentEntry = sortedEntries[0];
//         if (
//           currentEntry.Orders &&
//           currentEntry.Orders.length &&
//           currentEntry.Orders[0].Price
//         ) {
//           return Number(currentEntry.Orders[0].Price);
//         }
//       }
//     }
//   }
//   return 0;
// }

// function getDefaultCurrency(assetIds: string[]): string {
//   if (store.getState().ucmReducer) {
//     const ucmReducer = store.getState().ucmReducer;
//     if (ucmReducer.Orderbook && ucmReducer.Orderbook.length) {
//       const filteredEntries: OrderbookEntryType[] = ucmReducer.Orderbook.filter(
//         (entry: OrderbookEntryType) => assetIds.includes(entry.Pair[0])
//       );
//       const sortedEntries: OrderbookEntryType[] = sortOrderbookEntries(
//         filteredEntries,
//         "low-to-high"
//       );
//       if (sortedEntries && sortedEntries.length) {
//         const currentEntry = sortedEntries[0];
//         return currentEntry.Pair[1];
//       }
//     }
//   }
//   return AO.defaultToken;
// }

export function sortOrderbookEntries(
  entries: OrderbookEntryType[],
  sortType: AssetSortType
): OrderbookEntryType[] {
  const getSortKey = (entry: OrderbookEntryType): number => {
    if (!entry.Orders || entry.Orders.length === 0) return Infinity;
    return Number(entry.Orders[0].Price);
  };

  const getDateKey = (entry: OrderbookEntryType): number => {
    if (!entry.Orders || entry.Orders.length === 0) return 0;
    return new Date(entry.Orders[0].DateCreated).getTime();
  };

  let direction: number;

  switch (sortType) {
    case "high-to-low":
      direction = -1;
      break;
    case "low-to-high":
      direction = 1;
      break;
    case "recently-listed":
      direction = -1;
      break;
    default:
      direction = 1;
  }

  let entriesWithOrders = entries.filter(
    (entry) => entry.Orders && entry.Orders.length > 0
  );
  const entriesWithoutOrders = entries.filter(
    (entry) => !entry.Orders || entry.Orders.length === 0
  );

  entriesWithOrders.sort((a, b) => {
    if (sortType === "recently-listed") {
      return direction * (getDateKey(b) - getDateKey(a));
    } else {
      return direction * (getSortKey(a) - getSortKey(b));
    }
  });

  if (sortType === "recently-listed") {
    entriesWithOrders = entriesWithOrders.reverse();
  }

  return [...entriesWithOrders, ...entriesWithoutOrders];
}
