export default function CalendarGrid() {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const days = [];

  for (let i = 1; i <= 42; i++) {
    days.push(i);
  }

  return (
    <div className="calendar-grid-container">
      <div className="weekday-row">
        {weekdays.map((weekday) => (
          <div key={weekday}>{weekday}</div>
        ))}
      </div>
      <div className="day-cells-grid">
        {days.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
    </div>
  );
}
