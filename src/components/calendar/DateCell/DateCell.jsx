import { useEventStore } from "../../../store/useEventStore";
import "./dateCell.css";

const EMPTY_EVENTS = [];

export default function DateCell({ cell }) {
  const today = new Date();

  const cellYear = cell.year;
  const cellMonth = cell.month + 1;
  const cellDate = cell.day.toString().length === 1 ? "0" + cell.day : cell.day;

  const dailyKey = `${cellYear}-${
    cellMonth.toString().length === 1 ? "0" + cellMonth : cellMonth
  }-${cellDate}`;

  // ✅ stable fallback (no infinite re-render loop)
  const eventsOfTheDay = useEventStore(
    (s) => s.eventByDate[dailyKey] ?? EMPTY_EVENTS
  );

  const isToday =
    cell.year === today.getFullYear() &&
    cell.month === today.getMonth() &&
    cell.day === today.getDate();

  const isCurrentMonth = cell.monthType === "current";

  let className = "date-cell";
  if (!isCurrentMonth) className += " date-cell--faded";
  if (isToday) className += " date-cell--today";

  return (
    <div className={className}>
      <div className="date-number">{cell.day}</div>
      <div className="event-pill-container">
        {eventsOfTheDay.map((event, index) => (
          <div
            key={`${dailyKey}-${event.id}-${event.time || "notime"}-${index}`}
            className="event-pill"
          >
            <strong className="event-title">{event.title}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
