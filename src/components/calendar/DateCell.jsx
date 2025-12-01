export default function DateCell() {
  const days = [];

  for (let i = 1; i <= 42; i++) {
    days.push(i);
  }

  return (
    <div>
      {days.map((day) => (
        <div key={day}>{day}</div>
      ))}
    </div>
  );
}
