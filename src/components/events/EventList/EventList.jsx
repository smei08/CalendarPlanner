import { useEventStore } from "../../../store/useEventStore";
import { useState } from "react";
import EventFormModal from "../EventFormModal/EventFormModal";

export default function EventList({ sortMode = "date", timeFilter = "all" }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDateKey, setDateKey] = useState(null);
  const [editingEventId, setEventId] = useState(null);
  const [editingEventData, setEventData] = useState(null);

  // -----------------------------------------
  // 1. GET DATA FROM STORE
  // -----------------------------------------
  // eventByDate looks like:
  // {
  //   "2025-12-09": [event1, event2],
  //   "2025-12-10": [event3],
  // }
  const createEvent = useEventStore((state) => state.createEvent);
  const eventByDate = useEventStore((state) => state.eventByDate);
  const updateEvent = useEventStore((state) => state.updateEvent);
  const deleteEvent = useEventStore((state) => state.deleteEvent);

  // -----------------------------------------
  // 2. HANDLE EMPTY STATE (nothing to show)
  // -----------------------------------------
  if (!eventByDate || Object.keys(eventByDate).length === 0) {
    return (
      <div style={{ color: "black", padding: "16px" }}>No events yet.</div>
    );
  }

  // -----------------------------------------
  // 3. CONVERT eventsByDate OBJECT → ARRAY
  // -----------------------------------------
  // Object.entries(eventByDate) gives:
  // [
  //   ["2025-12-09", [event1, event2]],
  //   ["2025-12-10", [event3]],
  // ]
  const entries = Object.entries(eventByDate);

  const onClickEdit = (event, dateKey) => {
    setDateKey(dateKey);
    setEventId(event.id);
    setEventData({ ...event, date: dateKey });
    setIsModalOpen(true);
  };

  function handleSave(draftEvent) {
    if (editingEventId === null) {
      createEvent(draftEvent);
    } else {
      updateEvent(editingDateKey, editingEventId, draftEvent);
    }
  }

  function handleCloseModal() {
    setDateKey(null);
    setEventId(null);
    setEventData(null);
    setIsModalOpen(false);
  }

  // -----------------------------------------
  // 4. SORT DATES ASCENDING (default view)
  // -----------------------------------------
  // Sort by dateKey (yyy-mm-dd string)
  const sortedEntries = entries.sort((a, b) => a[0].localeCompare(b[0]));

  // -----------------------------------------
  // 5. FILTER: TODAY
  // -----------------------------------------
  // Find today's date in yyyy-mm-dd format
  const today = new Date();
  const formattedDate = today.toISOString().slice(0, 10); // "2025-12-09"
  const currentMonthNumber = formattedDate.slice(5, 7);
  const year = formattedDate.slice(0, 4);

  // Filter only the entries where the dateKey matches today
  const todayFilter = sortedEntries.filter(([dateKey, events]) => {
    return dateKey === formattedDate;
  });

  const monthFilter = sortedEntries.filter(([dateKey, events]) => {
    return (
      dateKey.slice(5, 7) === currentMonthNumber && dateKey.slice(0, 4) === year
    );
  });

  // -----------------------------------------
  // 6. DECIDE WHICH ARRAY WE WILL RENDER
  // -----------------------------------------
  // By default → show all sortedEntries
  let finalEntries = sortedEntries;

  // If user chose “today”, override finalEntries
  if (timeFilter === "today") {
    finalEntries = todayFilter;
  }
  if (timeFilter === "this-month") {
    finalEntries = monthFilter;
    console.log("month pressed");
  }

  // (Later you can add “this week”, “this month”, etc.)

  // -----------------------------------------
  // 7. RETURN RENDERED UI
  // -----------------------------------------
  return (
    <div>
      <div className="eventlist-container" style={{ color: "black" }}>
        {/* 🔽 MAP OVER FINAL ENTRIES (ONLY ONE MAP!) */}
        {finalEntries.map(([dateKey, events]) => {
          //----------------------------------------
          // 8. PARSE THE DATE TEXT
          //----------------------------------------
          // dateKey = "2025-12-09"
          const [y, m, day] = dateKey.split("-");

          const dateObj = new Date(Number(y), Number(m) - 1, Number(day));

          const weekday = dateObj.toLocaleDateString("en-US", {
            weekday: "long",
          });
          const monthLabel = dateObj.toLocaleDateString("en-US", {
            month: "short",
          });
          const dayOfMonth = dateObj.getDate();
          const year = dateObj.getFullYear();

          //----------------------------------------
          // 9. SORT EVENTS INSIDE EACH DATE GROUP
          //----------------------------------------
          // Copy events before sorting (good practice)
          let sortedEvents = [...events];

          if (sortMode === "label") {
            sortedEvents.sort((a, b) => {
              const A = (a.label || "").toLowerCase();
              const B = (b.label || "").toLowerCase();
              return A.localeCompare(B);
            });
          }

          //----------------------------------------
          // 10. RENDER THE DATE GROUP + EVENTS
          //----------------------------------------
          return (
            <div
              key={dateKey}
              className="eventlist-day"
              style={{
                display: "grid",
                gridTemplateColumns: "140px 1fr",
                gap: "16px",
                padding: "12px 16px",
                borderBottom: "1px solid #ddd",
              }}
            >
              {/* LEFT COLUMN */}
              <div className="eventlist-date-column">
                <div style={{ fontWeight: "bold" }}>
                  {monthLabel} {dayOfMonth}, {year}
                </div>
                <div style={{ fontSize: "0.85rem", color: "#555" }}>
                  {weekday.toUpperCase()}
                </div>
              </div>

              {/* RIGHT COLUMN – EVENTS */}
              <div className="eventlist-events-column">
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {sortedEvents.map((event) => (
                    <li
                      key={`${dateKey}-${event.id}`}
                      style={{ marginBottom: "8px" }}
                    >
                      <div style={{ display: "flex", gap: "8px" }}>
                        <strong>{event.title}</strong>
                        {event.time && (
                          <span style={{ fontSize: "0.85rem", color: "#444" }}>
                            {event.time}
                          </span>
                        )}
                      </div>

                      {event.description && (
                        <div style={{ fontSize: "0.9rem", color: "#555" }}>
                          {event.description}
                        </div>
                      )}

                      {event.label && (
                        <div
                          style={{
                            display: "inline-block",
                            marginTop: "4px",
                            padding: "2px 6px",
                            borderRadius: "999px",
                            backgroundColor: "#eee",
                            fontSize: "0.8rem",
                          }}
                        >
                          {event.label}
                        </div>
                      )}

                      {/* Buttons */}
                      <button onClick={() => onClickEdit(event, dateKey)}>
                        edit
                      </button>

                      <button onClick={() => deleteEvent(dateKey, event.id)}>
                        delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
      {isModalOpen && (
        <EventFormModal
          eventData={editingEventData}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
