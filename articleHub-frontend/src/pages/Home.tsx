import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import type { listEventOnUser } from '../interfaces/event';
import type { fetchUserEvent } from '../interfaces/response';
import Footer from '../components/user/Footer';
import { getUserEvents } from '../api/user';
import UserHeader from '../components/user/Header';
import UserEventList from '../components/user/EventList';

const Home: React.FC = () => {
  const [events, setEvents] = useState<listEventOnUser[]>([]);

  const fetchEventData = async () => {
    try {
      const response: fetchUserEvent = await getUserEvents();
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

  const now = new Date();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 ">
      <UserHeader />

      <UserEventList
        events={events.filter((element) => {
          const startDate = new Date(element.start_date);
          return startDate.getTime() > now.getTime();
        })}
        status="Upcoming"
      />
      <UserEventList
        events={events.filter((element) => {
          const endDate = new Date(element.end_date);
          return endDate.getTime() < now.getTime();
        })}
        status="Completed"
      />

      <UserEventList
        events={events.filter((element) => {
          const startDate = new Date(element.start_date);
          const endDate = new Date(element.end_date);
          return startDate.getTime() <= now.getTime() && endDate.getTime() >= now.getTime();
        })}
        status="Ongoing"
      />

      <Footer />
    </div>
  );
};

export default Home;
