import EventForm from "../EventForm/EventForm";

export default function EventFormModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <EventForm onClose={onClose} />
    </div>
  );
}
