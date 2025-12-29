// src/store/useEventStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Events are stored by dateKey (YYYY-MM-DD):
 * eventByDate = {
 *   "2025-12-09": [ {id, title, dateKey, ...}, ... ],
 *   "2025-12-10": [ ... ],
 * }
 */
export const useEventStore = create(
  persist(
    (set) => ({
      eventByDate: {},

      /**
       * Create a new event (normalized + stored under dateKey).
       */
      createEvent: (eventInput) => {
        const { title, date, time, label, description } = eventInput;

        // Generate a stable unique id
        const id =
          typeof crypto !== "undefined" && crypto.randomUUID
            ? crypto.randomUUID()
            : `evt-${Date.now()}-${Math.random().toString(16).slice(2)}`;

        // In this app, the form sends `date` in YYYY-MM-DD format.
        const dateKey = date;

        const newEvent = {
          id,
          title: (title ?? "").trim(),
          dateKey,
          time: time || "",
          label: (label ?? "").trim(),
          description: (description ?? "").trim(),
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

      /**
       * Update an existing event.
       * - Supports changing dates (moves event to another date bucket).
       * - Normalizes title/label/description the same way as createEvent.
       * - Prevents blank titles after trimming.
       */
      updateEvent: (oldDateKey, eventId, eventUpdate) => {
        set((state) => {
          const fromKey = oldDateKey;

          // Your form sends `date`, but the store uses `dateKey`.
          const toKey = eventUpdate?.date ?? eventUpdate?.dateKey ?? oldDateKey;

          const fromList = state.eventByDate[fromKey] || [];
          const target = fromList.find((e) => e.id === eventId);
          if (!target) return state;

          // Build a cleaned update object:
          // - Only normalize fields that are present in the update.
          // - Avoid persisting `date` (we use dateKey only).
          const cleanedUpdate = {
            ...eventUpdate,
            updatedAt: new Date().toISOString(),
          };

          // Normalize strings if present
          if (cleanedUpdate.title !== undefined) {
            cleanedUpdate.title = String(cleanedUpdate.title).trim();
            if (cleanedUpdate.title === "") return state; // reject blank title
          }

          if (cleanedUpdate.label !== undefined) {
            cleanedUpdate.label = String(cleanedUpdate.label).trim();
          }

          if (cleanedUpdate.description !== undefined) {
            cleanedUpdate.description = String(
              cleanedUpdate.description
            ).trim();
          }

          // Remove non-canonical date field to keep one source of truth in the store
          if ("date" in cleanedUpdate) delete cleanedUpdate.date;

          // Merge cleaned update into the target, and enforce dateKey consistency
          const updatedEvent = {
            ...target,
            ...cleanedUpdate,
            dateKey: toKey,
          };

          // Case A: same date bucket -> replace in place
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

          // Case B: date changed -> remove from old bucket and add to new bucket
          const newFromList = fromList.filter((e) => e.id !== eventId);
          const toList = state.eventByDate[toKey] || [];

          const nextEventByDate = { ...state.eventByDate };

          if (newFromList.length === 0) delete nextEventByDate[fromKey];
          else nextEventByDate[fromKey] = newFromList;

          nextEventByDate[toKey] = [...toList, updatedEvent];

          return { eventByDate: nextEventByDate };
        });
      },

      /**
       * Delete an event from a date bucket.
       */
      deleteEvent: (dateKey, eventId) => {
        set((state) => {
          const existingForDate = state.eventByDate[dateKey] || [];
          const updatedDateList = existingForDate.filter(
            (event) => event.id !== eventId
          );

          const nextEventByDate = { ...state.eventByDate };

          if (updatedDateList.length === 0) {
            delete nextEventByDate[dateKey];
          } else {
            nextEventByDate[dateKey] = updatedDateList;
          }

          return { eventByDate: nextEventByDate };
        });
      },
    }),
    { name: "calendarplanner-events-v1" }
  )
);
