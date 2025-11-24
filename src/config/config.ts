export const config = {
  walletAddress: import.meta.env.VITE_WALLET_ADDRESS ?? '',
  repoAddress: import.meta.env.VITE_REPOSITORY_ADDRESS ?? '',
} as const;
