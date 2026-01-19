// 환율 응답 DTO
export interface ExchangeRateResponse {
  exchangeRateId: number
  currency: string
  rate: number
  changePercentage: number
  applyDateTime: string
}

// 환전 주문 요청 DTO
export interface OrderRequest {
  exchangeRateId: number
  fromCurrency: string
  toCurrency: string
  forexAmount: number
}

// 환전 주문 응답 DTO
export interface OrderResponse {
  orderId: number
  fromCurrency: string
  fromAmount: number
  toCurrency: string
  toAmount: number
  appliedRate: number
  orderedAt: string
}

// 환전 주문 견적 요청 DTO
export interface OrderQuoteRequest {
  fromCurrency: string
  toCurrency: string
  forexAmount: number
}

// 환전 주문 견적 응답 DTO
export interface OrderQuoteResponse {
  krwAmount: number
  appliedRate: number
}
