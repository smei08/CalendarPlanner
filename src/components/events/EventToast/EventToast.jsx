import "./eventToast.css";

export default function EventToast({ message, onClose }) {
  return (
    <div className="confirmation">
      <h1>{message}</h1>
      <button onClick={onClose}>X</button>
    </div>
  );
}
