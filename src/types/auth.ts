export interface LoginResponse {
  memberId: number
  token: string
}

export interface AuthState {
  token: string | null
  memberId: number | null
  isAuthenticated: boolean
}
