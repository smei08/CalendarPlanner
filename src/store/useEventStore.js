import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useEventStore = create(
  persist((set, get) => ({
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
        console.log("before: ", state.eventByDate);
        const existingForDate = state.eventByDate[dateKey] || [];
        console.log("after: ", state.eventByDate);
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

        const updatedDate = existingForDate.filter((event) => {
          return event.id !== eventId;
        });

        const updatedDateCopy = { ...state.eventByDate };

        if (updatedDate.length === 0) {
          delete updatedDateCopy[dateKey];
        } else {
          updatedDateCopy[dateKey] = updatedDate;
        }

        return {
          eventByDate: updatedDateCopy,
        };
      });
    },
  })),
  { name: "calendarplanner-events-v1" }
);
