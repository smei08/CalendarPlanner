import IconButton from "../ui/IconButton";
import Button from "../ui/Button";
import MonthSwitcher from "../navigation/MonthSwitcher";
import Avatar from "../ui/Avatar";

export default function Navbar({ onToggleExpand }) {
  return (
    <div className="nav-bar">
      {/* left section: clasp and create btn */}
      <div className="nav-left">
        <IconButton variant="clasp" onClick={onToggleExpand} />
        <IconButton variant="add" />
      </div>

      {/* middle section: (today pill/butn) and (<MonthSwitcher />, <> + month/year) */}
      <div className="nav-middle">
        <Button variant="pill">Today</Button>
        <MonthSwitcher />
        <div>December 2025</div>
      </div>

      {/* right section: calender icon, eventoverview btn, profile pic */}
      <div className="nav-right">
        <IconButton variant="calendar" />
        <IconButton variant="eventOverview" />
        <Avatar />
      </div>
    </div>
  );
}
