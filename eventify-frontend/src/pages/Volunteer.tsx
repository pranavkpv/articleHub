import { useState } from "react";
import EventAttendance from "../components/volunteer/EventAttendance";
import FoodAttendance from "../components/volunteer/FoodAttendance";
import VolunteerDashboard from "../components/volunteer/Dashboard";
import VolunteerHeader from "../components/volunteer/Header";
import VolunteerSidebar from "../components/volunteer/Sidebar";

const VolunteerPage: React.FC = () => {
  const [activePage, setActivePage] = useState("dashboard");



  const renderContent = () => {
    switch (activePage) {
      // case "profile": return <VolunteerProfileUpdate />;
      // case "password": return <VolunteerChangePassword />;
      case "event-attendance": return <EventAttendance />;
      case "food-attendance": return <FoodAttendance />;
      default: return <VolunteerDashboard />;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <VolunteerHeader />
      <div className="flex flex-1 overflow-hidden bg-gradient-to-tr from-purple-50 to-indigo-100">
        <VolunteerSidebar active={activePage} onSelect={setActivePage} />
        <main className="flex-1 p-6 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default VolunteerPage
