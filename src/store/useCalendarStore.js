import { create } from "zustand";

export const useCalendarStore = create((set, get) => {
  const today = new Date();

  return {
    currentYear: today.getFullYear(),
    currentMonth: today.getMonth(),
    currentDate: today.getDate(),

    miniMode: "follow",
    miniYear: today.getFullYear(),
    miniMonth: today.getMonth(),

    goToToday: () => {
      const now = new Date();
      set({
        currentYear: now.getFullYear(),
        currentMonth: now.getMonth(),
        currentDate: now.getDate(),
      });
    },

    goToNextMonth: () => {
      const { currentMonth, currentYear } = get();

      let newMonth = currentMonth + 1;
      let newYear = currentYear;

      if (newMonth > 11) {
        newMonth = 0;
        newYear += 1;
      }

      set({
        currentMonth: newMonth,
        currentYear: newYear,
      });
    },

    goToPrevMonth: () => {
      const { currentMonth, currentYear } = get();

      let newMonth = currentMonth - 1;
      let newYear = currentYear;

      if (newMonth < 0) {
        newMonth = 11;
        newYear -= 1;
      }

      set({
        currentMonth: newMonth,
        currentYear: newYear,
      });
    },

    miniGoToPrevMonth: () => {
      set({ miniMode: "independent" });

      const { miniMonth, miniYear } = get();

      let newMonth = miniMonth - 1;
      let newYear = miniYear;

      if (newMonth < 0) {
        newMonth = 11;
        newYear -= 1;
      }

      set({
        miniMonth: newMonth,
        miniYear: newYear,
      });
    },

    miniGoToNextMonth: () => {
      set({ miniMode: "independent" });

      const { miniMonth, miniYear } = get();

      let newMonth = miniMonth + 1;
      let newYear = miniYear;

      if (newMonth > 11) {
        newMonth = 0;
        newYear += 1;
      }

      set({
        miniMonth: newMonth,
        miniYear: newYear,
      });
    },

    miniFollowMain: () => {
      const { currentMonth, currentYear } = get();

      set({
        miniMode: "follow",
        miniMonth: currentMonth,
        miniYear: currentYear,
      });
    },
  };
});
