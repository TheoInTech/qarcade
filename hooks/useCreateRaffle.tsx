import { AO } from "@/lib/config";
import { createDataItemSigner, message, result } from "@permaweb/aoconnect";

import { QueryClient, useMutation } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";

interface Payload {
  assetId: string;
  tickets: number;
  price: number;
  endDate: number;
}

const createRaffle = async (payload: Payload) => {
  /**
   * FLOW:
   * 1. Transfer the asset to the escrow
   * 2. Create the raffle
   */
  console.log("Creating raffle for asset", payload.assetId);
  const transferMessageId = await message({
    process: payload.assetId,
    signer: createDataItemSigner(window.arweaveWallet),
    tags: [{ name: "Action", value: "Transfer" }],
    data: JSON.stringify({ Recipient: AO.collectibleClashEscrow, Quantity: 1 }),
  });

  // Wait for the transfer to complete before creating the raffle
  await result({
    message: transferMessageId,
    process: payload.assetId,
  });

  // Create the raffle on the process
  const createRaffleMessageId = await message({
    process: AO.collectibleClash,
    signer: createDataItemSigner(window.arweaveWallet),
    tags: [{ name: "Action", value: "Create-Raffle" }],
    data: JSON.stringify({
      Asset: payload.assetId,
      Tickets: payload.tickets,
      Price: payload.price,
      EndDate: payload.endDate,
    }),
  });

  const createRaffleResponse = await result({
    message: createRaffleMessageId,
    process: AO.collectibleClash,
  }).then((res) => JSON.parse(res.Messages[0].Data) as string);

  return createRaffleResponse;
};

export const useCreateRaffle = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 60, // 1hr
      },
    },
  });

  return useMutation({
    mutationFn: (payload: Payload) => createRaffle(payload),
    onSuccess: async () => {
      const queryKey = queryKeys.fetchRaffles();
      await queryClient.invalidateQueries({ queryKey });
      await queryClient.refetchQueries({ queryKey });
    },
    onError(error) {
      console.error(error.message);
    },
  });
};
