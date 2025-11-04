import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaTrashAlt, FaEdit, FaUserPlus } from 'react-icons/fa';
import type { eventListProp } from '../../interfaces/prop';
import VolunteerModal from './AllVolunterList';
import { toast } from 'react-toastify';
import DeleteModal from './DeleteModal';
import { deleteEvent } from '../../api/admin';
import EditEvent from './EditEvent';

const EventList: React.FC<eventListProp> = ({ event, data, fetchEventData }) => {
  const navigate = useNavigate();
  const [listOn, setListOn] = useState(false);
  const [deleteOn, setDeleteOn] = useState(false);
  const [editOn, setEditOn] = useState(false);

  const deleteFun = async () => {
    const response = await deleteEvent(event._id);
    if (response.success) {
      toast.success(response.message);
      setDeleteOn(false);
      fetchEventData();
    } else {
      toast.error(response.message);
    }
  };

  function formatTo12Hour(timeString: string): string {
    const date = new Date(`1970-01-01T${timeString}`);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    const minuteStr = minutes.toString().padStart(2, '0');
    return `${hour12}:${minuteStr} ${ampm}`;
  }

  const status =
    new Date(event.start_date) > new Date()
      ? 'Upcoming'
      : new Date(event.end_date) < new Date()
      ? 'Completed'
      : 'Ongoing';

  return (
    <>
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex flex-col">
        <img
          src={event.image}
          alt={event.event_name}
          className="w-full h-48 object-cover md:h-64"
        />
        <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-lg">
          {status}
        </div>
        <div className="p-4 flex flex-col justify-between flex-1">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            {event.event_name}
          </h3>
          <p className="text-gray-200 text-sm mb-2 line-clamp-2">
            {event.description}
          </p>
          <p className="text-gray-300 text-sm mb-1">
            <span className="font-medium">Location:</span> {event.location}
          </p>

          <p className="text-gray-300 text-sm mb-1">
            <span className="font-medium">Start:</span>{' '}
            {new Date(event.start_date)
              .toISOString()
              .split('T')[0]
              .split('-')
              .reverse()
              .join('/')}
            , {formatTo12Hour(new Date(event.start_date).toISOString().split('T')[1])}
          </p>

          <p className="text-gray-300 text-sm mb-4">
            <span className="font-medium">End:</span>{' '}
            {new Date(event.end_date)
              .toISOString()
              .split('T')[0]
              .split('-')
              .reverse()
              .join('/')}
            , {formatTo12Hour(new Date(event.end_date).toISOString().split('T')[1])}
          </p>

          {data === 'event' ? (
            <div className="flex justify-around items-center gap-4 mt-auto">
              <button
                onClick={() =>
                  navigate('/admin/event-details', { state: { event } })
                }
                className="p-2 sm:p-3 bg-blue-600 text-white rounded-full shadow hover:bg-blue-500 transition"
                title="View Event"
              >
                <FaEye size={18} />
              </button>

              {new Date(event.start_date) >= new Date() && (
                <>
                  <button
                    onClick={() => setDeleteOn(true)}
                    className="p-2 sm:p-3 bg-red-600 text-white rounded-full shadow hover:bg-red-500 transition"
                    title="Delete Event"
                  >
                    <FaTrashAlt size={18} />
                  </button>

                  <button
                    onClick={() => setEditOn(true)}
                    className="p-2 sm:p-3 bg-green-600 text-white rounded-full shadow hover:bg-green-500 transition"
                    title="Edit Event"
                  >
                    <FaEdit size={18} />
                  </button>
                </>
              )}
            </div>
          ) : (
            <button
              onClick={() => setListOn(true)}
              className="flex justify-center items-center gap-2 w-full px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-500 transition mt-auto text-sm sm:text-base"
            >
              <FaUserPlus /> Add or Remove Volunteers
            </button>
          )}
        </div>
      </div>

      <DeleteModal deleteOn={deleteOn} setDeleteOn={setDeleteOn} deleteFun={deleteFun} data="event" />
      <VolunteerModal listOn={listOn} setListOn={setListOn} event={event} fetchEventData={fetchEventData} />
      <EditEvent editOn={editOn} setEditOn={setEditOn} event={event} fetchEventData={fetchEventData} />
    </>
  );
};

export default EventList;
