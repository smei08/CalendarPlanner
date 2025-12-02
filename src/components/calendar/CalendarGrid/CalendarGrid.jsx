import CalendarHeader from "../CalendarHeader/CalendarHeader";
import DateCell from "../DateCell/DateCell";
import "./calendarGrid.css";

export default function CalendarGrid() {
  const days = [];

  for (let i = 1; i <= 42; i++) {
    days.push(i);
  }

  return (
    <div className="calendar-grid-container">
      {/* Weekday header row */}
      <CalendarHeader />

      {/* 7 x 6 grid of date cells */}
      <div className="day-cells-grid">
        {days.map((day) => (
          <DateCell key={day} date={day} />
        ))}
      </div>
    </div>
  );
}
