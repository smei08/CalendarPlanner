import { useEventStore } from "../../../store/useEventStore";

import "./dateCell.css";

export default function DateCell({ cell }) {
  const today = new Date();

  const cellYear = cell.year;
  const cellMonth = cell.month + 1;
  const cellDate = cell.day.toString().length === 1 ? "0" + cell.day : cell.day;

  const eventByDate = useEventStore((state) => state.eventByDate);

  const dailyKey = `${cellYear}-${
    cellMonth.toString().length === 1 ? "0" + cellMonth : cellMonth
  }-${cellDate}`;

  const eventsOfTheDay = eventByDate[dailyKey] || [];

  const isToday =
    cell.year === today.getFullYear() &&
    cell.month === today.getMonth() &&
    cell.day === today.getDate();

  const isCurrentMonth = cell.monthType === "current";

  let className = "date-cell";

  if (!isCurrentMonth) {
    className += " date-cell--faded";
  }

  if (isToday) {
    className += " date-cell--today";
  }

  // TEMP: debug line
  // console.log("CELL", cell, "isToday?", isToday);

  return (
    <div>
      <div className={className}>{cell.day}</div>
      <div>{eventsOfTheDay.length}</div>
    </div>
  );
}
