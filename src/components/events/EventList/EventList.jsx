// src/components/events/EventList/EventList.jsx
import { useEventStore } from "../../../store/useEventStore";
import { useUIStore } from "../../../store/useUIStore";
import { useState } from "react";
import EventFormModal from "../EventFormModal/EventFormModal";

export default function EventList({ sortMode = "date", timeFilter = "all" }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDateKey, setDateKey] = useState(null);
  const [editingEventId, setEventId] = useState(null);
  const [editingEventData, setEventData] = useState(null);

  // Store actions/data
  const createEvent = useEventStore((state) => state.createEvent);
  const eventByDate = useEventStore((state) => state.eventByDate);
  const updateEvent = useEventStore((state) => state.updateEvent);
  const deleteEvent = useEventStore((state) => state.deleteEvent);

  // ✅ Global toast trigger
  const showToast = useUIStore((state) => state.showToast);

  if (!eventByDate || Object.keys(eventByDate).length === 0) {
    return (
      <div style={{ color: "black", padding: "16px" }}>No events yet.</div>
    );
  }

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
      showToast("Event Saved");
      handleCloseModal();
    } else {
      updateEvent(editingDateKey, editingEventId, draftEvent);
      showToast("Event Saved");
      handleCloseModal();
    }
  }

  function handleDelete(dateKey, event) {
    deleteEvent(dateKey, event.id);
    showToast("Event Deleted");
    handleCloseModal();
  }

  function handleCloseModal() {
    setDateKey(null);
    setEventId(null);
    setEventData(null);
    setIsModalOpen(false);
  }

  // --- sorting/filtering logic stays the same ---
  const sortedEntries = entries.sort((a, b) => a[0].localeCompare(b[0]));

  const today = new Date();
  const formattedDate = today.toISOString().slice(0, 10);
  const currentMonthNumber = formattedDate.slice(5, 7);
  const year = formattedDate.slice(0, 4);

  const todayFilter = sortedEntries.filter(
    ([dateKey]) => dateKey === formattedDate
  );

  const monthFilter = sortedEntries.filter(([dateKey]) => {
    return (
      dateKey.slice(5, 7) === currentMonthNumber && dateKey.slice(0, 4) === year
    );
  });

  let finalEntries = sortedEntries;
  if (timeFilter === "today") finalEntries = todayFilter;
  if (timeFilter === "this-month") finalEntries = monthFilter;

  return (
    <div>
      <div className="eventlist-container" style={{ color: "black" }}>
        {finalEntries.map(([dateKey, events]) => {
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

          let sortedEvents = [...events];

          if (sortMode === "label") {
            sortedEvents.sort((a, b) => {
              const A = (a.label || "").toLowerCase();
              const B = (b.label || "").toLowerCase();
              return A.localeCompare(B);
            });
          }

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
              <div className="eventlist-date-column">
                <div style={{ fontWeight: "bold" }}>
                  {monthLabel} {dayOfMonth}, {year}
                </div>
                <div style={{ fontSize: "0.85rem", color: "#555" }}>
                  {weekday.toUpperCase()}
                </div>
              </div>

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

                      <button onClick={() => onClickEdit(event, dateKey)}>
                        edit
                      </button>
                      <button onClick={() => handleDelete(dateKey, event)}>
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
