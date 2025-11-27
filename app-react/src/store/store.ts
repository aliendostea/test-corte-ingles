import { create } from "zustand";
import type { ItemsState, Item, useShowOverlayStoreProps } from "../utilities/types";

export const useItemsStore = create<ItemsState>((set, get) => ({
  items: [],
  deletedItems: [],

  add: (value: string) => {
    const newItem: Item = {
      id: window.crypto?.randomUUID?.() ?? String(Date.now()),
      value,
      isSelected: false,
    };
    set((state) => ({ items: [...state.items, newItem] }));
  },

  toggleSelect: (id: string) => {
    set((state) => ({
      items: state.items.map((item) => (item.id === id ? { ...item, isSelected: !item.isSelected } : item)),
    }));
  },

  deleteSelected: () => {
    const { items } = get();
    const selected = items.filter((item) => item.isSelected);
    if (selected.length === 0) throw new Error("No items selected");

    set((state) => {
      const deleted = selected.map((item) => ({ ...item, isSelected: false }));
      return {
        deletedItems: deleted,
        items: state.items.filter((item) => !item.isSelected),
      };
    });
  },

  recover: () => {
    const { deletedItems } = get();
    if (deletedItems.length === 0) throw new Error("Nothing to recover");
    set((state) => ({ items: [...state.items, ...state.deletedItems], deletedItems: [] }));
  },

  clearAll: () => set({ items: [], deletedItems: [] }),
}));

export const useShowOverlayStore = create<useShowOverlayStoreProps>((set) => ({
  showOverlay: null,

  setShowOverlay: () => {
    set((state) => ({
      showOverlay: !state.showOverlay,
    }));
  },
}));
