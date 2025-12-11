// src/components/navigation/MonthSwitcher.jsx
import { useCalendarStore } from "../../../store/useCalendarStore";
import "./monthSwitcher.css";

export default function MonthSwitcher() {
  // 1️⃣ Read current year & month from the store
  const currentYear = useCalendarStore((state) => state.currentYear);
  const currentMonth = useCalendarStore((state) => state.currentMonth);

  // 2️⃣ Get actions from the store
  const goToPrevMonth = useCalendarStore((state) => state.goToPrevMonth);
  const goToNextMonth = useCalendarStore((state) => state.goToNextMonth);

  // 3️⃣ Build a human-readable label like "December 2025"
  const dateForLabel = new Date(currentYear, currentMonth, 1);
  const monthLabel = dateForLabel.toLocaleDateString("en-US", {
    month: "long",
  });

  return (
    <div className="month-switcher">
      {/* LEFT ARROW: go to previous month */}
      <button
        type="button"
        className="month-switcher-btn"
        onClick={goToPrevMonth}
      >
        {"<"}
      </button>

      {/* MIDDLE: show "Month Year" */}
      <span className="month-switcher-label">
        {monthLabel} {currentYear}
      </span>

      {/* RIGHT ARROW: go to next month */}
      <button
        type="button"
        className="month-switcher-btn"
        onClick={goToNextMonth}
      >
        {">"}
      </button>
    </div>
  );
}
