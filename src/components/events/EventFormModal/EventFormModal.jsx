import EventForm from "../EventForm/EventForm";
import "../EventFormModal/eventFormModal.css";

export default function EventFormModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="model-content">
        <EventForm onClose={onClose} />
      </div>
    </div>
  );
}
