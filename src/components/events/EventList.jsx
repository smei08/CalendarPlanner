// src/components/events/EventList.jsx
import { useEventStore } from "../../store/useEventStore";

export default function EventList() {
  const eventByDate = useEventStore((state) => state.eventByDate);
  const updateEvent = useEventStore((state) => state.updateEvent);
  const deleteEvent = useEventStore((state) => state.deleteEvent);

  if (!eventByDate || Object.keys(eventByDate).length === 0) {
    return <div>No events yet.</div>;
  }

  return (
    <div className="eventlist-container">
      {Object.entries(eventByDate).map(([dateKey, events]) => (
        <div key={dateKey}>
          <strong>{dateKey}</strong>
          <ul>
            {events.map((event) => (
              <li key={event.id}>
                {/* Use real fields; adjust to your event shape */}
                {event.time || "--:--"} — {event.title}
                {event.description && <div>{event.description}</div>}
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
      ))}
    </div>
  );
}
