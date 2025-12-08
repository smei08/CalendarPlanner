import CalendarHeader from "../CalendarHeader/CalendarHeader";
import DateCell from "../DateCell/DateCell";
import "./calendarGrid.css";

import { useState } from "react";

export default function CalendarGrid() {
  const days = [];
  const today = new Date();

  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentDate, setCurrentDate] = useState(today.getDate());

  const current = new Date(currentYear, currentMonth + 1, 0);
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const prevMonthLastDate = new Date(currentYear, currentMonth, 0).getDate();

  let prevYear = currentYear - 1;
  let prevMonth = currentMonth;
  if (prevMonth < 0) {
    prevMonth = 11;
    prevYear -= 1;
  }

  let nextYear = currentYear + 1;
  let nextMonth = currentMonth;
  if (nextMonth > 11) {
    prevMonth = 0;
    prevYear += 1;
  }

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

  console.log(days);
  return (
    <div className="calendar-grid-container">
      {/* Weekday header row */}
      <CalendarHeader />

      {/* 7 x 6 grid of date cells */}
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
