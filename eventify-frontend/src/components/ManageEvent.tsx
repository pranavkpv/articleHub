import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import AddEvent from './subcomponents/AddEvent';
import EventList from './subcomponents/EventList';
import type { listEventOnAdmin } from '../interfaces/event';
import type { fetchAdminEvent } from '../interfaces/response';
import { getAdminEvent } from '../api/admin';

const ManageEvent: React.FC = () => {
  const [addOn, setAddOn] = useState(false);
  const [events, setEvents] = useState<listEventOnAdmin[]>([]);



  const fetchEventData = async () => {
    try {
      const response: fetchAdminEvent = await getAdminEvent();
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
  }, [addOn]);

  return (
    <div className="p-6 bg-gray-800 min-h-screen">
      <h2 className="text-3xl font-extrabold text-indigo-400 border-b-2 border-indigo-400 pb-2 mb-8">
        Manage Events
      </h2>
      <div className="bg-gray-900 p-6 rounded-lg shadow-2xl mb-6">
        <button
          onClick={() => setAddOn(true)}
          className="mb-4 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition duration-300 transform hover:scale-[1.02] shadow-md"
        >
          + Add Event
        </button>
        {addOn && <AddEvent addOn={addOn} setAddOn={setAddOn} />}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.length > 0 ? (
          events.map((event, index) => (
            <EventList key={index} event={event} data="event" fetchEventData={fetchEventData} />
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-full py-10 bg-gray-900 rounded-lg shadow-2xl">
            No events found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ManageEvent;