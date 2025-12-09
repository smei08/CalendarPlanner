// src/layouts/AppLayout.jsx
import { useState } from "react";

import Navbar from "../components/navigation/Navbar/Navbar";
import MiniCalendarCard from "../components/calendar/MiniCalendar";
import LabelCard from "../components/notes/LabelCard";
import NotesCard from "../components/notes/NotesCard";
import EventFormModal from "../components/events/EventFormModal/EventFormModal";
import EventOverviewPage from "../pages/EventOverview/EventOverviewPage";

import "./applayout.css";

export default function AppLayout({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);

  // "calendar" | "events"
  const [activeView, setActiveView] = useState("calendar");

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const toggleOpen = () => {
    setShowEventForm(true);
  };

  const handleClickCalendar = () => {
    setActiveView("calendar");
  };

  const handleClickEvent = () => {
    setActiveView("events");
  };

  return (
    <div className="app-layout">
      {/* Top navbar */}
      <header className="top-header">
        <Navbar
          onToggleOpen={toggleOpen}
          onToggleExpand={toggleExpand}
          onClickCalendar={handleClickCalendar}
          onClickEvent={handleClickEvent}
        />
      </header>

      {/* Event modal */}
      {showEventForm && (
        <EventFormModal onClose={() => setShowEventForm(false)} />
      )}

      {/* Quick panels row (shows when clasp is "open"/expanded) */}
      {!isExpanded && (
        <div className="header-cards">
          <MiniCalendarCard />
          <LabelCard />
          <NotesCard />
        </div>
      )}

      {/* Main page content: calendar vs event overview */}
      <main className="calendar-content">
        {activeView === "calendar" ? children : <EventOverviewPage />}
      </main>
    </div>
  );
}
