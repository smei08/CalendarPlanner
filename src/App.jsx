// import { useState } from "react";
import "./App.css";
import AppLayout from "./layouts/AppLayout";
import DashboardPage from "./pages/Dashboard/DashboardPage";

function App() {
  return (
    <div>
      <div>
        <AppLayout>
          <DashboardPage />
        </AppLayout>
      </div>
    </div>
  );
}

export default App;
