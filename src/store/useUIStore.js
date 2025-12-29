import { create } from "zustand";

export const useUIStore = create((set) => ({
  isToastOpen: false,
  toastMessage: "",

  showToast: (message) => {
    set({ isToastOpen: true, toastMessage: message || "" });
  },

  hideToast: () => {
    set({ isToastOpen: false, toastMessage: "" });
  },
}));
