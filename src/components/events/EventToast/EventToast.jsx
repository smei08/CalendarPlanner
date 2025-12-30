import "./eventToast.css";
import Button from "../../ui/Button/Button";

export default function EventToast({ message, onClose }) {
  return (
    <div className="confirmation">
      <h1>{message}</h1>
      <Button onClick={onClose}>X</Button>
    </div>
  );
}
