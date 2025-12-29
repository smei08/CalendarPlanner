import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Navbar from "../components/navigation/Navbar/Navbar";
import EventFormModal from "../components/events/EventFormModal/EventFormModal";
import EventToast from "../components/events/EventToast/EventToast";

import "./applayout.css";
import { useCalendarStore } from "../store/useCalendarStore";
import { useEventStore } from "../store/useEventStore";
import { useUIStore } from "../store/useUIStore";

export default function AppLayout() {
  const [showEventForm, setShowEventForm] = useState(false);

  const goToToday = useCalendarStore((state) => state.goToToday);
  const createEvent = useEventStore((state) => state.createEvent);

  const isToastOpen = useUIStore((state) => state.isToastOpen);
  const toastMessage = useUIStore((state) => state.toastMessage);
  const showToast = useUIStore((state) => state.showToast);
  const hideToast = useUIStore((state) => state.hideToast);
  const navigate = useNavigate();

  const toggleOpen = () => setShowEventForm(true);

  const handleClickToday = () => {
    navigate("/calendar");
    goToToday();
  };

  function handleSave(draftEvent) {
    createEvent(draftEvent);
    setShowEventForm(false);

    showToast("EVENT SAVED");
  }

  useEffect(() => {
    if (!isToastOpen) return;
    const timerID = setTimeout(() => {
      hideToast();
    }, 2000);
    return () => clearTimeout(timerID);
  }, [isToastOpen, hideToast]);

  return (
    <div className="app-layout">
      {/* Top navbar */}
      <header className="top-header">
        <Navbar onToggleOpen={toggleOpen} onClickToday={handleClickToday} />
      </header>

      {/* Event modal */}
      {showEventForm && (
        <EventFormModal
          onClose={() => setShowEventForm(false)}
          onSave={handleSave}
        />
      )}

      {isToastOpen && <EventToast message={toastMessage} onClose={hideToast} />}

      {/* Main page content: calendar vs event overview */}
      <main className="calendar-content">
        <Outlet />
      </main>
    </div>
  );
}
