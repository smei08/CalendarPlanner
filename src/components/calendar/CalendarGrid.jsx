import CalendarHeader from "./CalendarHeader";
import DateCell from "./DateCell";

export default function CalendarGrid() {
  return (
    <div className="calendar-grid-container">
      <div className="weekday-row">
        <CalendarHeader />
      </div>
      <div className="day-cells-grid">
        <DateCell />
      </div>
    </div>
  );
}
