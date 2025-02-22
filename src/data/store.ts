import { create } from 'zustand'
import { items, NavItem } from './nav'

interface TabStore {
    tabs: NavItem[];
    selectedTab: string;
    setSelectedTab: (value: string) => void;
  }

export const useTabStore = create<TabStore>((set) => ({
    tabs: [...items],
    selectedTab: items[0]?.value,
    setSelectedTab: (value: string) => set(() => ({ selectedTab: value }))
}))
