import { useState } from "react"
import type { listEventOnUser } from "../../interfaces/event"
import QRCodeScanner from "../subcomponents/QrcodeScanner"

interface prop {
  events: listEventOnUser[]
  eventBase: string
}
function VolunteerEventList({ events, eventBase }: prop) {
  const [scanOn, setScanOn] = useState(false);
  const [event, setEvent] = useState("");

  function formatTo12Hour(timeString: string): string {
    const date = new Date(`1970-01-01T${ timeString }`);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    const ampm = hours >= 12 ? "PM" : "AM";
    const hour12 = hours % 12 || 12;
    const minuteStr = minutes.toString().padStart(2, "0");

    return `${ hour12 }:${ minuteStr } ${ ampm }`;
  }

  return (
    <main className="flex-1 mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.length > 0 ? (
          events.map((item, index) => (
            <div key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-200 overflow-hidden flex flex-col">
              <img
                src={item.image}
                alt={item.event_name}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-indigo-900 mb-1">{item.event_name}</h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{item.description}</p>
                  <p className="text-gray-700 text-sm mb-1">
                    <span className="font-bold">Location:</span> {item.location}
                  </p>
                  <p className="text-indigo-600 text-sm mb-4 font-medium">
                    <span className="font-bold">Start:</span> {(new Date(item.start_date).toISOString().split('T')[0].split('-').reverse().join('/'))} ,
                    {formatTo12Hour(new Date(item.start_date).toISOString().split('T')[1])} <br />
                    <span className="font-bold">End:</span> {(new Date(item.end_date).toISOString().split('T')[0].split('-').reverse().join('/'))} ,
                    {formatTo12Hour(new Date(item.end_date).toISOString().split('T')[1])}
                  </p>
                </div>
                {eventBase == "event" ?
                  <button
                    onClick={() => { setEvent(item._id); setScanOn(true); }}
                    className="w-full mt-3 py-2 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg shadow hover:scale-105 transition"
                  >
                    Mark Attendance
                  </button> :
                  <button
                    onClick={() => { setEvent(item._id); setScanOn(true); }}
                    className="w-full mt-3 py-2 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg shadow hover:scale-105 transition"
                  >
                    Mark as Eaten
                  </button>
                }

              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center col-span-full">No events available.</p>
        )}
      </div>
      <QRCodeScanner scanOn={scanOn} setScanOn={setScanOn} event={event} eventBase={eventBase} />
    </main>
  );
}

export default VolunteerEventList