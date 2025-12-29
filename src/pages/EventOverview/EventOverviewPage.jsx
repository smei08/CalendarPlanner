// src/pages/EventOverview/EventOverviewPage.jsx
import { useState } from "react";
import EventList from "../../components/events/EventList/EventList";
import "./eventOverviewPage.css";
import MiniCalendar from "../../components/calendar/MiniCalendar/MiniCalendar";
import NotesCard from "../../components/notes/NotesCard";

export default function EventOverviewPage() {
  const [sortMode, setSortMode] = useState("date");
  const [timeFilter, setTimeFilter] = useState("all");

  return (
    <div className="events-container">
      <div className="mini-calendar">
        <MiniCalendar />
      </div>
      {/* <div className="quotes">
        <NotesCard />
      </div> */}
      <div>
        <h1>UPCOMING EVENTS</h1>

        <div className="filter">
          <fieldset className="filter-group">
            <legend className="filter-label">FILTER</legend>

            <div className="filter-options">
              <label className="btn">
                <input
                  type="radio"
                  name="filter-value"
                  value="all"
                  checked={timeFilter === "all"}
                  onChange={() => setTimeFilter("all")}
                />
                ALL
              </label>

              <label className="btn">
                <input
                  type="radio"
                  name="filter-value"
                  value="today"
                  checked={timeFilter === "today"}
                  onChange={() => setTimeFilter("today")}
                />
                TODAY
              </label>

              <label className="btn">
                <input
                  type="radio"
                  name="filter-value"
                  value="this-month"
                  checked={timeFilter === "this-month"}
                  onChange={() => setTimeFilter("this-month")}
                />
                THIS MONTH
              </label>
            </div>
          </fieldset>
        </div>

        <div className="sort">
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
        <EventList sortMode={sortMode} timeFilter={timeFilter} />
      </div>
    </div>
  );
}
