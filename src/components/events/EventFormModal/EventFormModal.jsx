import EventForm from "../EventForm/EventForm";
import "../EventFormModal/eventFormModal.css";
import "../../events/EventForm/EventForm.css";

export default function EventFormModal({ onClose, eventData, onSave }) {
  return (
    <div className="modal-overlay form-container">
      <div className="form-header">
        {!eventData ? <h2>Plan your day</h2> : <h2>Adjust your day</h2>}
      </div>
      <div className="model-content">
        <EventForm onClose={onClose} initialEvent={eventData} onSave={onSave} />
      </div>
    </div>
  );
}
