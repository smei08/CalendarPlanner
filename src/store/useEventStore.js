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
      createdAt: new Date().toISOString(),
    };

    set((state) => {
      const existingForDate = state.eventByDate[dateKey] || [];
      return {
        eventByDate: {
          ...state.eventByDate,
          [dateKey]: [...existingForDate, newEvent],
        },
      };
    });
    return newEvent;
  },

  updateEvent: (dateKey, eventId, eventUpdate) => {
    set((state) => {
      console.log("old: ", state.eventByDate);
      const existingForDate = state.eventByDate[dateKey] || [];

      const updatedDate = existingForDate.map((event) => {
        return event.id === eventId ? { ...event, ...eventUpdate } : event;
      });

      console.log("new", {
        eventByDate: {
          ...state.eventByDate,
          [dateKey]: updatedDate,
        },
      });
      return {
        eventByDate: {
          ...state.eventByDate,
          [dateKey]: updatedDate,
        },
      };
    });
  },

  deleteEvent: (dateKey, eventId) => {
    set((state) => {
      const existingForDate = state.eventByDate[dateKey] || [];

      console.log("not delete: ", state.eventByDate);
      const updatedDate = existingForDate.filter((event) => {
        return event.id !== eventId;
      });

      console.log("delete", updatedDate);
      return {
        eventByDate: {
          ...state.eventByDate,
          [dateKey]: updatedDate,
        },
      };
    });
  },
}));
