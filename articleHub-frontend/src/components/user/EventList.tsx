import { useNavigate } from "react-router-dom"
import type { userEventListProp } from "../../interfaces/prop"

function UserEventList({ events, status }: userEventListProp) {
  const navigate = useNavigate()

  function formatTo12Hour(timeString: string): string {
    const date = new Date(`1970-01-01T${ timeString }`); // attach any date
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    const ampm = hours >= 12 ? "PM" : "AM";
    const hour12 = hours % 12 || 12;
    const minuteStr = minutes.toString().padStart(2, "0");

    return `${ hour12 }:${ minuteStr } ${ ampm }`;
  }

  return (
    <main className="flex-1 mt-24 p-4">
      <h2 className="text-2xl font-bold text-gray-900 bg-indigo-100 py-4 px-6 rounded-lg shadow mb-6">
        {status} Events
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event._id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow overflow-hidden group relative">
              <img src={event.image}
                alt={event.event_name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform" />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.event_name}</h3>
                <span className="absolute top-4 right-4 bg-indigo-100 text-indigo-800 font-bold rounded px-2 py-1 text-xs">
                  {status}
                </span>
                <p className="text-gray-700 text-sm mb-2 line-clamp-2">{event.description}</p>
                <p className="text-gray-800 text-xs mb-1">
                  <span className="font-semibold">Location:</span> {event.location}
                </p>
                <p className="text-indigo-700 text-xs mb-4">
                  <span className="font-bold">Start:</span> {(new Date(event.start_date).toISOString().split('T')[0].split('-').reverse().join('/'))} ,
                  {formatTo12Hour(new Date(event.start_date).toISOString().split('T')[1])}
                  <br />
                  <span className="font-bold">End:</span> {(new Date(event.end_date).toISOString().split('T')[0].split('-').reverse().join('/'))} ,
                  {formatTo12Hour(new Date(event.end_date).toISOString().split('T')[1])}
                </p>
                <button onClick={() => navigate('/user/event-details', { state: { event, status } })}
                  className="w-full py-2 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-md hover:bg-indigo-500 transition duration-300">
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">No events available.</p>
        )}
      </div>
    </main>

  )
}
export default UserEventList