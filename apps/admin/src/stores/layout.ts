import { create } from "zustand";

export type LayoutMode = "sidebar" | "topbar" | "bottombar";

interface LayoutStore {
  mode: LayoutMode;
  setMode: (mode: LayoutMode) => void;
}

const STORAGE_KEY = "layout_mode";

function getSavedMode(): LayoutMode {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as LayoutMode | null;
    if (saved && ["sidebar", "topbar", "bottombar"].includes(saved)) {
      return saved;
    }
  } catch {
    // ignore
  }
  return "sidebar";
}

export const useLayoutStore = create<LayoutStore>((set) => ({
  mode: getSavedMode(),
  setMode: (mode) => {
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // ignore
    }
    set({ mode });
  },
}));
