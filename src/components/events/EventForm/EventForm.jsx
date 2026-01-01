import { useState, useEffect } from "react";
import "./eventForm.css";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button/Button";

export default function EventForm({ onClose, initialEvent, onSave }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !date) {
      setError("Title and Date is required.");
      return;
    }

    setError("");

    const draftEvent = {
      title: title.trim(),
      date,
      time,
      label: label.trim(),
      description: description.trim(),
    };

    onSave(draftEvent);

    onClose();
    navigate("/events");
  }

  useEffect(() => {
    if (initialEvent) {
      // Edit mode → prefill form
      setTitle(initialEvent.title || "");
      setDate(initialEvent.dateKey || "");
      setTime(initialEvent.time || "");
      setLabel(initialEvent.label || "");
      setDescription(initialEvent.description || "");
    } else {
      // Create mode → reset form
      setTitle("");
      setDate("");
      setTime("");
      setLabel("");
      setDescription("");
    }

    // Clear errors when switching modes/events
    setError("");
  }, [initialEvent]);

  return (
    <div className="form-container">
      {error && <div className="form-error">{error}</div>}

      <form className="form-body" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>
            Title
            {/* TITLE */}
            <input
              className="input title"
              name="title"
              placeholder="Add Title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
        </div>

        {/* DATE + TIME */}
        <div className="form-row">
          <label>
            Date
            <input
              className="input date"
              type="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>

          {/* <label>
            Time
            <input
              className="input"
              type="time"
              name="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </label> */}
        </div>

        {/* LABEL */}
        <div className="form-row">
          <label>
            Label
            <input
              className="input"
              name="label"
              placeholder="e.g. Work, Birthday, Study"
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </label>
        </div>
        <div className="form-row">
          {/* DESCRIPTION */}
          <label>
            Description
            <textarea
              className="textarea"
              name="description"
              placeholder="Add optional notes"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>

        {/* BUTTONS */}
        <div className="form-actions">
          <Button type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}
