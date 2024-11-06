import { AO } from "@/lib/config";
import { createDataItemSigner, message, result } from "@permaweb/aoconnect";

import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";
import { IRaffle } from "@/lib/types";

const fetchRaffles = async () => {
  const messageId = await message({
    process: AO.collectibleClash,
    signer: createDataItemSigner(window.arweaveWallet),
    tags: [{ name: "Action", value: "List-Raffles" }],
  });

  const response = await result({
    message: messageId,
    process: AO.collectibleClash,
  }).then((res) => JSON.parse(res.Messages[0].Data) as IRaffle[]);

  return response;
};

export const useFetchRaffles = () => {
  return useQuery({
    queryKey: queryKeys.fetchRaffles(),
    queryFn: async () => fetchRaffles(),
    staleTime: 30_000,
    refetchInterval: 30_000,
  });
};
