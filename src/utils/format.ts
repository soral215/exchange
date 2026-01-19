import type { CurrencyCode } from '@/types'

const currencyFormatters: Record<CurrencyCode, Intl.NumberFormat> = {
  KRW: new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    maximumFractionDigits: 0,
  }),
  USD: new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }),
  JPY: new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'JPY',
    maximumFractionDigits: 0,
  }),
}

export function formatCurrency(amount: number, currency: CurrencyCode): string {
  return currencyFormatters[currency].format(amount)
}

export function formatNumber(value: number, decimals = 2): string {
  return new Intl.NumberFormat('ko-KR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}
