// 통화 코드 타입
export type CurrencyCode = 'KRW' | 'USD' | 'JPY'

// 지갑 응답 DTO
export interface WalletResponse {
  walletId: number
  currency: string
  balance: number
}

// 지갑 요약 응답 DTO
export interface WalletSummaryResponse {
  totalKrwBalance: number
  wallets: WalletResponse[]
}
