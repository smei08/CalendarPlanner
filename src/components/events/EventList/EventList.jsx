import { useEventStore } from "../../../store/useEventStore";

export default function EventList({ sortMode = "date" }) {
  const eventByDate = useEventStore((state) => state.eventByDate);
  const updateEvent = useEventStore((state) => state.updateEvent);
  const deleteEvent = useEventStore((state) => state.deleteEvent);

  // 1. Handle "no events" state
  if (!eventByDate || Object.keys(eventByDate).length === 0) {
    return (
      <div
        style={{
          color: "black",
          padding: "16px",
        }}
      >
        No events yet.
      </div>
    );
  }
  const entries = Object.entries(eventByDate);

  const sortedByDate = entries.sort((a, b) => {
    new Date(a.date) - new Date(b.date);
  });

  const sortedByLabel = entries.sort((a, b) => {
    // const lableA = a.label.toUpperCase();
    // const lableB = b.label.toUpperCase();

    if (a.label < b.label) {
      return -1;
    }
    if (a.label > b.label) {
      return 1;
    }
    return 0;
  });
  console.log("sorted by label: ", sortedByLabel);

  // 2. Normal case: we have events
  return (
    <div className="eventlist-container" style={{ color: "black" }}>
      {Object.entries(eventByDate).map(([dateKey, events]) => {
        // ---- JS section: compute date labels ----
        const [y, m, day] = dateKey.split("-");

        const dateObj = new Date(Number(y), Number(m) - 1, Number(day));

        const weekday = dateObj.toLocaleDateString("en-US", {
          weekday: "long",
        }); // "Mon"

        const month = dateObj.toLocaleDateString("en-US", {
          month: "short",
        }); // "Dec"

        const dayOfMonth = dateObj.getDate(); // 1–31
        const year = dateObj.getFullYear(); // 2025

        // ---- JSX section: return for this date group ----
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
            {/* LEFT COLUMN: date */}
            <div className="eventlist-date-column">
              <div style={{ fontWeight: "bold" }}>
                {month} {dayOfMonth} {year}
              </div>
              <div style={{ fontSize: "0.85rem", color: "#555" }}>
                {weekday.toUpperCase()}
              </div>
            </div>

            {/* RIGHT COLUMN: events for this day */}
            <div className="eventlist-events-column">
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {events.map((event) => (
                  <li
                    key={event.id}
                    className="eventlist-item"
                    style={{ marginBottom: "8px" }}
                  >
                    <div
                      className="eventlist-title-row"
                      style={{ display: "flex", gap: "8px" }}
                    >
                      <strong>{event.title}</strong>
                      {event.time && (
                        <span
                          className="eventlist-time"
                          style={{ fontSize: "0.85rem", color: "#444" }}
                        >
                          {event.time}
                        </span>
                      )}
                    </div>

                    {event.description && (
                      <div
                        className="eventlist-description"
                        style={{ fontSize: "0.9rem", color: "#555" }}
                      >
                        {event.description}
                      </div>
                    )}

                    {event.label && (
                      <div
                        className="eventlist-label"
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
                    <button
                      onClick={() =>
                        updateEvent(dateKey, event.id, { title: "UPDATED!" })
                      }
                    >
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
  );
}
