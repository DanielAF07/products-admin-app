import { authCheckStatus, authLogin, authRegister } from "@/actions/auth/auth"
import { StorageAdapter } from "@/config/adapters/storage-adapter"
import { User } from "@/domain/entities/user"
import type { AuthStatus } from "@/infrastructure/interfaces/auth.status"
import { create } from 'zustand'

export interface AuthState {
  status: AuthStatus
  token?: string
  user?: User

  login: (email: string, password: string) => Promise<boolean>
  register: (fullName: string, email: string, password: string) => Promise<boolean>
  checkStatus: () => Promise<void>
  logout: () => Promise<void>
}

const INITIAL_STATE = {
  status: 'checking',
  token: undefined,
  user: undefined,
}

export const useAuthStore = create<AuthState>()((set,get) => ({
  status: 'checking',
  token: undefined,
  user: undefined,

  login: async (email, password) => {
    const response = await authLogin(email, password)
    if (!response) {
      set({ ...INITIAL_STATE, status: 'unauthenticated' })
      return false
    }
    await StorageAdapter.setItem('token', response.token)
    set({ status: 'authenticated', token: response.token, user: response.user })
    return true
  },

  register: async (fullName, email, password) => {
    const response = await authRegister(fullName, email, password)
    if (!response) {
      set({ ...INITIAL_STATE, status: 'unauthenticated' })
      return false
    }
    await StorageAdapter.setItem('token', response.token)
    set({ status: 'authenticated', token: response.token, user: response.user })
    return true
  },

  checkStatus: async () => {
    const response = await authCheckStatus()
    if (!response) {
      set({ ...INITIAL_STATE, status: 'unauthenticated' })
      return
    }
    await StorageAdapter.setItem('token', response.token)
    set({ status: 'authenticated', token: response.token, user: response.user })
  },
  logout: async () => {
    await StorageAdapter.removeItem('token')
    set({ ...INITIAL_STATE, status: 'unauthenticated'})
  }
}))