import "../DateCell/dateCell.css";

export default function DateCell({ date }) {
  return <div className="date-cell">{date}</div>;
}

// import "../DateCell/dateCell.css";

// export default function DateCell() {
//   const days = [];

//   for (let i = 1; i <= 42; i++) {
//     days.push(i);
//   }

//   return (
//     <div className="dateCell">
//       {days.map((day) => (
//         <div className="day" key={day}>
//           {day}
//         </div>
//       ))}
//     </div>
//   );
// }
