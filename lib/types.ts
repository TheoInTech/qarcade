export type TagType = { name: string; value: string };

export type AOProfileResponseType = {
  Owner: string;
  Profile: {
    DisplayName: string | null;
    UserName: string | null;
    Description: string | null;
    ProfileImage: string | null;
    CoverImage: string | null;
    Version: string | null;
  };
};

export type AOProfileType = {
  id: string | null;
  walletAddress: string;
  displayName: string | null;
  username: string | null;
  bio: string | null;
  avatar: string | null;
  banner: string | null;
  version: string | null;
};

export type ProfileHeaderType = AOProfileType;

export type CollectionMetricsType = {
  assetCount: number | null;
  // floorPrice: number | null;
  // defaultCurrency: string;
};

export type CollectionResponseType = {
  Name: string;
  Description: string | null;
  Creator: string;
  DateCreated: string;
  Banner: string | null;
  Thumbnail: string | null;
  Assets: string[];
};

export type CollectionType = {
  id: string;
  title: string;
  description: string | null;
  creator: string;
  dateCreated: string;
  banner: string | null;
  thumbnail: string | null;
};

export type CollectionDetailType = CollectionType & {
  assetIds: string[];
  creatorProfile: AOProfileType | null;
  metrics: CollectionMetricsType;
};

export type EntryOrderType = {
  DepositTxId: string;
  DateCreated: string;
  OriginalQuantity: string;
  Creator: string;
  Id: string;
  Token: string;
  Quantity: string;
  Price?: string;
};

export type OrderbookEntryType = {
  Pair: string[];
  Orders?: EntryOrderType[];
  PriceData?: {
    DominantToken: string;
    Vwap: string;
    MatchLogs: {
      Id: string;
      Quantity: string;
      Price: string;
    }[];
    Block: string;
  };
};

export type AssetSortType = "high-to-low" | "low-to-high" | "recently-listed";

export interface GenericResponse<T = undefined> {
  success: boolean;
  message: string;
  data: T;
}

export interface IRaffle {
  Asset: string;
  Tickets: number;
  Price: number;
  EndDate: number;
  Creator: string;
  CreatedAt: number;
  TicketsSold: number;
}
