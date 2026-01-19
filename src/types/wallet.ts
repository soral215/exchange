export type CurrencyCode = 'KRW' | 'USD' | 'JPY'

export interface WalletBalance {
  currency: CurrencyCode
  amount: number
}

export interface Wallet {
  walletId: number
  balances: WalletBalance[]
}
