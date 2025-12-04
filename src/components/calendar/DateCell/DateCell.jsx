import "./dateCell.css";

export default function DateCell({ cell }) {
  const today = new Date();

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
  console.log("CELL", cell, "isToday?", isToday);

  return <div className={className}>{cell.day}</div>;
}
