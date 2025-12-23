import { useCalendarStore } from "../../../../store/useCalendarStore";
import "./miniCalendar.css";

export default function MiniCalendar() {
  const weekDays = ["S", "M", "T", "W", "TH", "F", "S"];
  const miniYear = useCalendarStore((state) => state.miniYear);
  const miniMonth = useCalendarStore((state) => state.miniMonth);

  const miniDays = [];

  const current = new Date(miniYear, miniMonth + 1, 0);
  const firstDayIndex = new Date(miniYear, miniMonth, 1).getDay();
  const prevMonthLastDate = new Date(miniYear, miniMonth, 0).getDate();

  const prevYear = miniMonth === 0 ? miniYear - 1 : miniYear;
  const prevMonth = miniMonth === 0 ? 11 : miniMonth - 1;

  const nextYear = miniMonth === 11 ? miniYear + 1 : miniYear;
  const nextMonth = miniMonth === 11 ? 0 : miniMonth + 1;

  const dateForLabel = new Date(miniYear, miniMonth, 1);
  const monthLabel = dateForLabel.toLocaleDateString("en-US", {
    month: "long",
  });

  for (let i = firstDayIndex - 1; i >= 0; i--) {
    let prev = prevMonthLastDate - i;
    miniDays.push({
      day: prev,
      monthType: "prev",
      year: prevYear,
      month: prevMonth,
    });
  }

  for (let i = 1; i <= current.getDate(); i++) {
    miniDays.push({
      day: i,
      monthType: "current",
      year: miniYear,
      month: miniMonth,
    });
  }

  const remainingCells = 42 - miniDays.length;
  for (let i = 1; i <= remainingCells; i++) {
    miniDays.push({
      day: i,
      monthType: "next",
      year: nextYear,
      month: nextMonth,
    });
  }

  return (
    <div className="mini-calendar-container">
      <div className="mini-header">
        <div className="mini-month">
          {monthLabel}
          {miniYear}
        </div>
      </div>
      <div className="mini-weekday">
        {weekDays.map((weekday, index) => (
          <div className="mini-weekday" key={`${weekday}-${index}`}>
            {weekday}
          </div>
        ))}
      </div>
      <div className="mini-cell-grid">
        {miniDays.map((cell) => (
          <div key={`${cell.year}-${cell.month}-${cell.day}`}>{cell.day}</div>
        ))}
      </div>
    </div>
  );
}
