import "../CalendarHeader/calendarHeader.css";

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
    <div className="weekday-header">
      {weekdays.map((weekday) => (
        <div className="weekday" key={weekday}>
          {weekday}
        </div>
      ))}
    </div>
  );
}
