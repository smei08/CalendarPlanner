// src/components/navigation/Navbar/Navbar.jsx
import IconButton from "../../ui/IconButton";
import Button from "../../ui/Button";
import MonthSwitcher from "../MonthSwitcher/MonthSwitcher";
import Avatar from "../../ui/Avatar";
import "./navbar.css";

export default function Navbar({
  onToggleExpand,
  onToggleOpen,
  onClickCalendar,
  onClickEvent,
  onClickToday,
}) {
  return (
    <div className="nav-bar">
      {/* left section: avatar, clasp, add */}
      <div className="nav-left">
        <Avatar />
        <IconButton variant="clasp" onClick={onToggleExpand} />
        <IconButton variant="add" onClick={onToggleOpen} />
      </div>

      {/* middle section */}
      <div className="nav-middle">
        <Button variant="today" onClick={onClickToday}>
          Today
        </Button>
        <MonthSwitcher />
      </div>

      {/* right section: calendar + event overview */}
      <div className="nav-right">
        <IconButton variant="calendar" onClick={onClickCalendar} />
        <IconButton variant="eventOverview" onClick={onClickEvent} />
      </div>
    </div>
  );
}
