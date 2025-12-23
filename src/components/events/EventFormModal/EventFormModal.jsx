import EventForm from "../EventForm/EventForm";
import "../EventFormModal/eventFormModal.css";

export default function EventFormModal({ onClose, eventData, onSave }) {
  return (
    <div className="modal-overlay">
      <div className="model-content">
        <EventForm
          onClose={onClose}
          initialEvent={eventData}
          // onSave={handleSave}
        />
      </div>
    </div>
  );
}
