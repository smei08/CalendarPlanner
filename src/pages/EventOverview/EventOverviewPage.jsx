// src/pages/EventOverview/EventOverviewPage.jsx
import EventList from "../../components/events/EventList/EventList";

export default function EventOverviewPage() {
  return (
    <div className="events-container">
      <h1>UPCOMING EVENTS</h1>
      <EventList />
    </div>
  );
}
