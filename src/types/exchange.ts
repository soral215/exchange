import type { CurrencyCode } from './wallet'

export interface ExchangeRate {
  currency: CurrencyCode
  rate: number
  timestamp: string
}

export interface QuoteRequest {
  fromCurrency: CurrencyCode
  toCurrency: CurrencyCode
  amount: number
}

export interface QuoteResponse {
  quoteId: string
  fromCurrency: CurrencyCode
  toCurrency: CurrencyCode
  fromAmount: number
  toAmount: number
  rate: number
  expiresAt: string
}

export interface ExchangeOrder {
  orderId: number
  fromCurrency: CurrencyCode
  toCurrency: CurrencyCode
  fromAmount: number
  toAmount: number
  rate: number
  status: 'COMPLETED' | 'PENDING' | 'FAILED'
  createdAt: string
}
