// hooks/use-user.ts
'use client'
import { create } from 'zustand'

type UserStore = {
  isClient: boolean
  user: {name: string, image: string}
  toggleRole: () => void
}

export const useUser = create<UserStore>((set) => ({
  user: {
    name: 'Joseph',
    image: ''
  },
  isClient: true, // Defina conforme seu auth
  toggleRole: () => set((state) => ({ isClient: !state.isClient })),
}))