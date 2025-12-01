import Navbar from "../components/navigation/Navbar/Navbar";
import MiniCalenderCard from "../components/calendar/MiniCalendar";
import LabelCard from "../components/notes/LabelCard";
import NotesCard from "../components/notes/NotesCard";
import { useState } from "react";

export default function AppLayout({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="app-layout">
      {/* top header */}
      <header className="top-header">
        <Navbar onToggleExpand={toggleExpand} />
      </header>

      {/* header cards (when unclasped) */}
      {isExpanded && (
        <div className="header-cards">
          <MiniCalenderCard />
          <LabelCard />
          <NotesCard />
        </div>
      )}

      {/* main calendar content (page goes here) */}
      <main className="calendar-content">{children}</main>
    </div>
  );
}
