// src/pages/EventOverview/EventOverviewPage.jsx
import { useState } from "react";
import EventList from "../../components/events/EventList/EventList";
import "./eventOverviewPage.css";

export default function EventOverviewPage() {
  const [sortMode, setSortMode] = useState("date"); // "date" | "label"

  return (
    <div className="events-container">
      <h1>UPCOMING EVENTS</h1>

      <div className="sort-button">
        <fieldset className="sort-group">
          <legend className="sort-label">SORT</legend>

          <div className="sort-options">
            <label className="btn">
              <input
                type="radio"
                name="sort-value"
                value="date"
                checked={sortMode === "date"}
                onChange={() => setSortMode("date")}
              />
              DATE
            </label>

            <label className="btn">
              <input
                type="radio"
                name="sort-value"
                value="label"
                checked={sortMode === "label"}
                onChange={() => setSortMode("label")}
              />
              LABEL
            </label>
          </div>
        </fieldset>
      </div>

      {/* 👇 pass sortMode down so EventList can use it */}
      <EventList sortMode={sortMode} />
    </div>
  );
}
