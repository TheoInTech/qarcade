import { AO } from "@/lib/config";
import { createDataItemSigner, dryrun, message } from "@permaweb/aoconnect";

import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";

const fetchAssets = async () => {
  const activeAddress = await window.arweaveWallet.getActiveAddress();

  await message({
    process: AO.collectibleClash,
    signer: createDataItemSigner(window.arweaveWallet),
    tags: [{ name: "Action", value: "Get-Atomic-Assets-By-Owner" }],
  });

  return dryrun({
    process: AO.collectibleClash,
    signer: createDataItemSigner(window.arweaveWallet),
    tags: [
      { name: "Action", value: "Dryrun-Fetch-Assets" },
      { name: "Address", value: activeAddress },
    ],
  }).then((res) => JSON.parse(res.Messages[0].Data) as string[]);
};

export const useFetchAssets = () => {
  return useQuery({
    queryKey: queryKeys.fetchAssets(),
    queryFn: async () => fetchAssets(),
    staleTime: 30_000,
    refetchInterval: 30_000,
  });
};
