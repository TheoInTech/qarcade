export const queryKeys = {
  all: ["all"] as const,
  fetchAssets: () => [...queryKeys.all, "fetchAssets"] as const,
};