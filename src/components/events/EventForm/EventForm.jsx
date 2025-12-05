// import IconButton from "../../ui/IconButton";
import "./eventForm.css";

export default function EventForm({ onClose }) {
  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Plan your day</h2>
        {/* X button */}
        <button type="button" className="form-close-button" onClick={onClose}>
          ×
        </button>
      </div>

      <form className="form-body">
        <input
          className="input title"
          name="title"
          placeholder="Add Title"
          type="text"
        />

        <div className="form-row">
          <label>
            Date
            <input className="input" type="date" name="date" />
          </label>

          <label>
            Time
            <input className="input" type="time" name="time" />
          </label>
        </div>

        <label>
          Label
          <input
            className="input"
            name="label"
            placeholder="e.g. Work, Birthday, Study"
            type="text"
          />
        </label>

        <label>
          Description
          <textarea
            className="textarea"
            name="description"
            placeholder="Add optional notes"
          />
        </label>

        <div className="form-actions">
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}
