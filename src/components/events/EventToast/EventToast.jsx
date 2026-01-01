import "./eventToast.css";
import Button from "../../ui/Button/Button";

export default function EventToast({ message, onClose }) {
  return (
    <div className="event-toast">
      <span className="toast-text">{message}</span>

      <Button variant="sm" className="toast-close" onClick={onClose}>
        X
      </Button>
    </div>
  );
}
