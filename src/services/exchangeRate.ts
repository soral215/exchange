import { apiClient } from './client'
import type { ApiResponse, ExchangeRateResponse } from '@/types'

export const exchangeRateService = {
  getLatest: async (): Promise<ExchangeRateResponse[]> => {
    const response = await apiClient.get<ApiResponse<ExchangeRateResponse[]>>(
      '/exchange-rates/latest'
    )
    return response.data.data
  },
}
