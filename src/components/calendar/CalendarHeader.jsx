export default function CalendarHeader() {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div>
      {weekdays.map((weekday) => (
        <div key={weekday}>{weekday}</div>
      ))}
    </div>
  );
}
