// src/components/calendar/CalendarGrid/CalendarGrid.jsx
import CalendarHeader from "../CalendarHeader/CalendarHeader";
import DateCell from "../DateCell/DateCell";
import "./calendarGrid.css";

import { useCalendarStore } from "../../../store/useCalendarStore";

export default function CalendarGrid() {
  // ✅ get currentYear + currentMonth from global store
  const currentYear = useCalendarStore((state) => state.currentYear);
  const currentMonth = useCalendarStore((state) => state.currentMonth);
  // const currentDate = useCalendarStore((state) => state.currentDate); // use later if needed

  const days = [];

  // your existing logic, but using currentYear/currentMonth FROM STORE
  const current = new Date(currentYear, currentMonth + 1, 0);
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const prevMonthLastDate = new Date(currentYear, currentMonth, 0).getDate();

  const prevYear = currentYear - 1;
  const prevMonth = currentMonth;

  const nextYear = currentYear + 1;
  const nextMonth = currentMonth + 1;

  for (let i = firstDayIndex - 1; i >= 0; i--) {
    let prev = prevMonthLastDate - i;
    days.push({
      day: prev,
      monthType: "prev",
      year: prevYear,
      month: prevMonth,
    });
  }

  for (let i = 1; i <= current.getDate(); i++) {
    days.push({
      day: i,
      monthType: "current",
      year: currentYear,
      month: currentMonth,
    });
  }

  const remainingCells = 42 - days.length;
  for (let i = 1; i <= remainingCells; i++) {
    days.push({
      day: i,
      monthType: "next",
      year: nextYear,
      month: nextMonth,
    });
  }

  return (
    <div className="calendar-grid-container">
      <CalendarHeader />
      <div className="day-cells-grid">
        {days.map((cell) => (
          <DateCell
            key={`${cell.year}-${cell.month}-${cell.day}`}
            cell={cell}
          />
        ))}
      </div>
    </div>
  );
}
