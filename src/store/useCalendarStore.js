// src/store/useCalendarStore.js
import { create } from "zustand";

export const useCalendarStore = create((set) => {
  const today = new Date();

  return {
    // state
    currentYear: today.getFullYear(),
    currentMonth: today.getMonth(), // 0–11
    currentDate: today.getDate(),

    // actions
    goToToday: () => {
      const now = new Date();
      set({
        currentYear: now.getFullYear(),
        currentMonth: now.getMonth(),
        currentDate: now.getDate(),
      });
    },
  };
});
