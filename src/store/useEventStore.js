import { create } from "zustand";

export const useEventStore = create((set, get) => ({
  eventByDate: {},
  createEvent: (eventInput) => {
    const { title, date, time, label, description } = eventInput;
    let id;
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      id = crypto.randomUUID();
    } else {
      id = `evt-${Date.now}-${Math.random().toString(16).slice(2)}`;
    }
    const dateKey = date;

    const newEvent = {
      id,
      title: title.trim(),
      dateKey,
      time,
      label: label.trim(),
      description,
      createdAt: newDate().toISOString(),
    };

    set((state) => {
      const existingForDate = state.eventsByDate[dateKey] || [];
      return {
        eventsByDate: {
          ...state.eventByDate,
          [dateKey]: [...existingForDate, newEvent],
        },
      };
    });
    return newEvent;
  },
}));
