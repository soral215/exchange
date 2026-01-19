import { create } from 'zustand'
import type { AuthState } from '@/types'

interface AuthStore extends AuthState {
  setAuth: (token: string, memberId: number) => void
  clearAuth: () => void
}

const getInitialState = (): AuthState => {
  const token = localStorage.getItem('accessToken')
  const memberId = localStorage.getItem('memberId')
  
  return {
    token,
    memberId: memberId ? Number(memberId) : null,
    isAuthenticated: !!token,
  }
}

export const useAuthStore = create<AuthStore>((set) => ({
  ...getInitialState(),
  
  setAuth: (token: string, memberId: number) => {
    localStorage.setItem('accessToken', token)
    localStorage.setItem('memberId', String(memberId))
    set({
      token,
      memberId,
      isAuthenticated: true,
    })
  },
  
  clearAuth: () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('memberId')
    set({
      token: null,
      memberId: null,
      isAuthenticated: false,
    })
  },
}))
