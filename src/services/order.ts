import { apiClient } from './client'
import type {
  ApiResponse,
  OrderRequest,
  OrderResponse,
  OrderQuoteRequest,
  OrderQuoteResponse,
} from '@/types'

export const orderService = {
  getOrders: async (): Promise<OrderResponse[]> => {
    const response = await apiClient.get<ApiResponse<OrderResponse[]>>(
      '/orders'
    )
    return response.data.data
  },

  createOrder: async (request: OrderRequest): Promise<string> => {
    const response = await apiClient.post<ApiResponse<string>>(
      '/orders',
      request,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    return response.data.data
  },

  getQuote: async (request: OrderQuoteRequest): Promise<OrderQuoteResponse> => {
    const params = new URLSearchParams({
      fromCurrency: request.fromCurrency,
      toCurrency: request.toCurrency,
      forexAmount: request.forexAmount.toString(),
    })
    const response = await apiClient.get<ApiResponse<OrderQuoteResponse>>(
      `/orders/quote?${params.toString()}`
    )
    return response.data.data
  },
}
