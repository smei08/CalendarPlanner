import { useState } from "react";

import Navbar from "../components/navigation/Navbar/Navbar";
import MiniCalendarCard from "../components/calendar/MiniCalendar";
import LabelCard from "../components/notes/LabelCard";
import NotesCard from "../components/notes/NotesCard";
import EventFormModal from "../components/events/EventFormModal/EventFormModal";

import "./applayout.css";

export default function AppLayout({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const toggleOpen = () => {
    setShowEventForm(true);
  };

  return (
    <div className="app-layout">
      {/* Top navbar */}
      <header className="top-header">
        <Navbar onToggleOpen={toggleOpen} onToggleExpand={toggleExpand} />
      </header>
      {showEventForm && (
        <EventFormModal onClose={() => setShowEventForm(false)} />
      )}
      {/* Quick panels row (shows when clasp is open) */}
      {isExpanded && (
        <div className="header-cards">
          <MiniCalendarCard />
          <LabelCard />
          <NotesCard />
        </div>
      )}

      {/* Main page content (calendar, overview, etc.) */}
      <main className="calendar-content">{children}</main>
    </div>
  );
}
