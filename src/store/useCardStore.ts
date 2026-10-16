import { create } from 'zustand'

interface CardStore {
  activeIndex: number
  showSource: boolean
  setActiveIndex: (index: number) => void
  setShowSource: (show: boolean) => void
  changeCard: (direction: number, total: number) => void
}

export const useCardStore = create<CardStore>((set) => ({
  activeIndex: 0,
  showSource: false,
  setActiveIndex: (activeIndex) => set({ activeIndex, showSource: false }),
  setShowSource: (showSource) => set({ showSource }),
  changeCard: (direction, total) => set((state) => ({
    activeIndex: (state.activeIndex + direction + total) % total,
    showSource: false,
  })),
}))
