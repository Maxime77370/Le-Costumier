import { User } from 'types/user'
import { create } from 'zustand'

interface AuthStore {
  user: User | null
  isLogged: boolean | null
  setUser: (user: User | null) => void
  setIsLogged: (isLogged: boolean) => void
}

export const useAuthStore = create<AuthStore>(set => ({
  user: null,
  isLogged: null,
  setUser: user => set({ user }),
  setIsLogged: isLogged => set({ isLogged })
}))
