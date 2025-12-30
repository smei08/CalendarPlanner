import Button from "../../ui/Button/Button";
import MonthSwitcher from "../MonthSwitcher/MonthSwitcher";
import "./navbar.css";
import { Link } from "react-router-dom";

export default function Navbar({
  // onToggleExpand,
  onToggleOpen,
  onClickToday,
}) {
  return (
    <div className="nav-bar">
      {/* left section: avatar, clasp, add */}
      <div className="nav-left">
        <img
          className="logo"
          src="https://cdn-icons-png.flaticon.com/256/826/826904.png"
        />
        <Button variant="add" onClick={onToggleOpen}>
          ADD
        </Button>
      </div>

      {/* middle section */}
      <div className="nav-middle">
        <Button variant="today" onClick={onClickToday}>
          TODAY
        </Button>
        <MonthSwitcher />
      </div>

      {/* right section: calendar + event overview */}
      <nav className="nav-right">
        <Link to="/calendar">Calendar</Link>
        <Link to="/events">Events</Link>
      </nav>
    </div>
  );
}
