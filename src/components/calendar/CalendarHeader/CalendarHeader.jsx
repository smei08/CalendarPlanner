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

// import CalendarHeader from "../../calendar/CalendarHeader/CalendarHeader";
// import DateCell from "../DateCell/DateCell";
// import "../CalendarGrid/calendarGrid.css";

// export default function CalendarGrid() {
//   return (
//     <div className="calendar-grid-container">
//       {/* <div className="weekday-row"> */}
//       <CalendarHeader />
//       {/* </div> */}
//       {/* <div className="day-cells-grid"> */}
//       <DateCell />
//       {/* </div> */}
//     </div>
//   );
// }
