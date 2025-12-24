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
        // console.log("before: ", state.eventByDate);
        const existingForDate = state.eventByDate[dateKey] || [];
        // console.log("after: ", state.eventByDate);
        return {
          eventByDate: {
            ...state.eventByDate,
            [dateKey]: [...existingForDate, newEvent],
          },
        };
      });
      return newEvent;
    },

    updateEvent: (oldDateKey, eventId, eventUpdate) => {
      set((state) => {
        const fromKey = oldDateKey;

        // Your form sends `date`, but your store uses `dateKey`.
        const toKey = eventUpdate.date ?? eventUpdate.dateKey ?? oldDateKey;

        const fromList = state.eventByDate[fromKey] || [];

        // Find the event we are editing
        const target = fromList.find((e) => e.id === eventId);
        if (!target) return state; // nothing to update

        // Build the updated event object (make sure dateKey stays consistent)
        const updatedEvent = {
          ...target,
          ...eventUpdate,
          dateKey: toKey,
        };

        // Case A: same date bucket → just replace inside the array
        if (toKey === fromKey) {
          const updatedList = fromList.map((e) =>
            e.id === eventId ? updatedEvent : e
          );

          return {
            eventByDate: {
              ...state.eventByDate,
              [fromKey]: updatedList,
            },
          };
        }

        // Case B: date changed → remove from old bucket and add to new bucket
        const newFromList = fromList.filter((e) => e.id !== eventId);
        const toList = state.eventByDate[toKey] || [];

        const nextEventByDate = { ...state.eventByDate };

        // update/remove old bucket
        if (newFromList.length === 0) delete nextEventByDate[fromKey];
        else nextEventByDate[fromKey] = newFromList;

        // add to new bucket
        nextEventByDate[toKey] = [...toList, updatedEvent];

        return { eventByDate: nextEventByDate };
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
