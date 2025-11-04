import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { listEventOnUser } from "../../interfaces/event";
import type { fetchUserEvent } from "../../interfaces/response";
import VolunteerEventList from "./Eventlist";
import { getVolunteerEvent } from "../../api/volunteer";

const EventAttendance: React.FC = () => {
  const [events, setEvents] = useState<listEventOnUser[]>([]);
  const fetchEventData = async () => {
    try {
      const response: fetchUserEvent = await getVolunteerEvent();
      if (response.success) {
        setEvents(response.data);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('Failed to fetch events');
    }
  };

  useEffect(() => {
    fetchEventData();
  }, []);
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Event Attendance</h2>
      <VolunteerEventList events={events} eventBase="event" />
    </div>
  );
};

export default EventAttendance;
