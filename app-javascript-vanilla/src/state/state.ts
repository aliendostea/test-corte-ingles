import type { Item } from "../utilities/types";

//// Model
const state = {
  items: [] as Item[],
  deletedItems: [] as Item[],
};

export const StateActions = {
  add: (value: string) => {
    const newItem = {
      id: window.crypto.randomUUID(),
      value,
      isSelected: false,
    };
    state.items = [...state.items, newItem];
  },

  toggleSelect: (value: string, id: string) => {
    const item = state.items.find((i) => i.id === id && i.value === value);

    if (item) item.isSelected = !item.isSelected;
  },

  deleteSelected: () => {
    const selected = state.items.filter((i) => i.isSelected);
    if (selected.length === 0) throw new Error("No items selected");

    state.deletedItems = selected.map((i) => ({ ...i, isSelected: false }));
    state.items = state.items.filter((i) => !i.isSelected);
  },

  recover: () => {
    if (state.deletedItems.length === 0) throw new Error("Nothing to recover");

    state.items = [...state.items, ...state.deletedItems];
    state.deletedItems = [];
  },
};

export { state };
