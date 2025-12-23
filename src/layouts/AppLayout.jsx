// src/layouts/AppLayout.jsx
import { useState } from "react";

import Navbar from "../components/navigation/Navbar/Navbar";
import MiniCalendar from "../../src/components/calendar/DateCell/MiniCalendar/MiniCalendar";
import LabelCard from "../components/notes/LabelCard";
import NotesCard from "../components/notes/NotesCard";
import EventFormModal from "../components/events/EventFormModal/EventFormModal";
import EventOverviewPage from "../pages/EventOverview/EventOverviewPage";

import "./applayout.css";
import { useCalendarStore } from "../store/useCalendarStore";
import { useEventStore } from "../store/useEventStore";

export default function AppLayout({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  // "calendar" | "events"
  const [activeView, setActiveView] = useState("calendar");

  const goToToday = useCalendarStore((state) => state.goToToday);
  const createEvent = useEventStore((state) => state.createEvent);

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

  const handleClickToday = () => {
    setActiveView("calendar");
    goToToday();
  };

  function handleSave(draftEvent) {
    createEvent(draftEvent);
    setShowEventForm(false);
  }

  return (
    <div className="app-layout">
      {/* Top navbar */}
      <header className="top-header">
        <Navbar
          onToggleOpen={toggleOpen}
          onToggleExpand={toggleExpand}
          onClickCalendar={handleClickCalendar}
          onClickEvent={handleClickEvent}
          onClickToday={handleClickToday}
        />
      </header>

      {/* Event modal */}
      {showEventForm && (
        <EventFormModal
          onClose={() => setShowEventForm(false)}
          onSave={handleSave}
        />
      )}

      {/* Quick panels row (shows when clasp is "open"/expanded) */}
      {!isExpanded && (
        <div className="header-cards">
          <MiniCalendar />
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
