import { apiClient } from './client'
import type { ApiResponse, LoginResponse } from '@/types'

export const authService = {
  login: async (email: string): Promise<LoginResponse> => {
    const response = await apiClient.post<ApiResponse<LoginResponse>>(
      `/auth/login?email=${encodeURIComponent(email)}`
    )
    return response.data.data
  },
}
