import { apiClient } from './client'
import type { ApiResponse, WalletSummaryResponse } from '@/types'

export const walletService = {
  getWallets: async (): Promise<WalletSummaryResponse> => {
    const response = await apiClient.get<ApiResponse<WalletSummaryResponse>>(
      '/wallets'
    )
    return response.data.data
  },
}
