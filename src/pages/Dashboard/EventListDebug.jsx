import { useEventStore } from "../../store/useEventStore";

export default function EventListDebug() {
  const eventByDate = useEventStore((state) => state.eventByDate);

  return (
    <div
      style={{ padding: "1rem", borderTop: "1px solid #ccc", color: "black" }}
    >
      <h2>Debug Event Panel</h2>

      {Object.entries(eventByDate).map(([dateKey, events]) => (
        <div key={dateKey} style={{ marginBottom: "1rem" }}>
          <strong>{dateKey}</strong>

          <ul>
            {events.map((event) => (
              <li key={event.id}>
                {event.time || "--:--"} — {event.title}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
