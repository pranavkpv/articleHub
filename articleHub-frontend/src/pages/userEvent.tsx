import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { listEventOnUser } from "../interfaces/event";
import { toast } from "react-toastify";
import { usersEvent } from "../api/user";
import UserHeader from "../components/user/Header";
import Footer from "../components/user/Footer";


function UserEvent() {

   const [events, setEvents] = useState<listEventOnUser[]>([])

   function formatTo12Hour(timeString: string): string {
      const date = new Date(`1970-01-01T${ timeString }`);
      const hours = date.getUTCHours();
      const minutes = date.getUTCMinutes();

      const ampm = hours >= 12 ? "PM" : "AM";
      const hour12 = hours % 12 || 12;
      const minuteStr = minutes.toString().padStart(2, "0");

      return `${ hour12 }:${ minuteStr } ${ ampm }`;
   }
   const navigate = useNavigate()

   const userEventFetch = async () => {
      const response = await usersEvent()
      if (response.success) {
         setEvents(response.data)
      } else {
         toast.error(response.message)
      }
   }

   useEffect(() => {
      userEventFetch()
   }, [])

   return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 ">
         <UserHeader />
         <main className="flex-1 mt-24 p-4">
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
                              {new Date(event.start_date) > new Date() ? 'UpComing' : new Date(event.end_date) < new Date() ? 'Completed' : 'Ongoing'}
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
                           <button onClick={() => navigate('/user/event-details', { state: { event } })}
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
         <Footer />
      </div>
   )
}
export default UserEvent