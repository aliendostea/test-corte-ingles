export type Item = {
  id: string;
  value: string;
  isSelected: boolean;
};

export type ItemsState = {
  items: Item[];
  deletedItems: Item[];
  add: (value: string) => void;
  toggleSelect: (id: string) => void;
  deleteSelected: () => void;
  recover: () => void;
  clearAll: () => void;
};

export type useShowOverlayStoreProps = {
  showOverlay: boolean | null;
  setShowOverlay: () => void;
};
