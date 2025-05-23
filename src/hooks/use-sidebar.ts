// hooks/use-sidebar.ts
'use client'
import { create } from 'zustand'

type SidebarStore = {
  isOpen: boolean
  toggle: () => void
}

export const useSidebar = create<SidebarStore>((set) => ({
  isOpen: true,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}))