import React from "react";
import { CalendarCheck, Utensils } from "lucide-react";

interface SidebarProps {
  active: string;
  onSelect: (page: string) => void;
}

const VolunteerSidebar: React.FC<SidebarProps> = ({ active, onSelect }) => {
  const items = [
    // { id: "dashboard", label: "Dashboard", icon: <Home size={20} /> },
    // { id: "profile", label: "Profile Update", icon: <User size={20} /> },
    // { id: "password", label: "Change Password", icon: <Lock size={20} /> },
    { id: "event-attendance", label: "Event Attendance", icon: <CalendarCheck size={20} /> },
    { id: "food-attendance", label: "Food Attendance", icon: <Utensils size={20} /> },
  ];
  return (
    <aside className="w-74 bg-white h-[calc(100vh-70px)] shadow-xl rounded-r-3xl p-5 hidden sm:flex flex-col">
      <nav className="flex flex-col gap-2">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`flex items-center gap-3 py-3 px-5 rounded-lg font-bold transition text-lg
              ${ active === item.id
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow"
                : "text-gray-700 hover:bg-indigo-100" }
            `}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};


export default VolunteerSidebar;
