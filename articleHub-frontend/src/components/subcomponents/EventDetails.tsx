import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaTicketAlt, FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaGift, FaUserTie } from "react-icons/fa";
import type { listEventOnAdmin } from '../../interfaces/event';

const EventDetails: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const event: listEventOnAdmin = location.state?.event;

    function formatTo12Hour(timeString: string): string {
        const date = new Date(`1970-01-01T${ timeString }`); 
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();

        const ampm = hours >= 12 ? "PM" : "AM";
        const hour12 = hours % 12 || 12;
        const minuteStr = minutes.toString().padStart(2, "0");

        return `${ hour12 }:${ minuteStr } ${ ampm }`;
    }

    if (!event) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-800">
                <div className="bg-gray-900 text-gray-200 rounded-xl shadow-2xl p-8 border border-gray-700">
                    <p className="text-red-400 font-semibold text-center mb-6">No event data available. The event object was not passed correctly.</p>
                    <button
                        onClick={() => navigate("/admin/add-event")}
                        className="w-full py-3 px-6 bg-indigo-600 text-white rounded-lg font-bold shadow-lg hover:bg-indigo-700 transition"
                    >
                        Back to Events
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-800 flex items-center justify-center py-8 px-2 sm:px-6">
            <div className="w-full max-w-4xl bg-gray-900 text-gray-200 rounded-3xl shadow-2xl overflow-hidden ring-1 ring-gray-700">
                <div className="relative">
                    <img src={event.image} alt={event.event_name}
                        className="w-full h-80 sm:h-96 object-cover object-center rounded-t-3xl shadow-sm transition-transform duration-200 hover:scale-105 opacity-80" />

                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-gray-800/80 text-indigo-400 px-4 py-1 rounded-lg shadow font-bold text-lg border border-indigo-500">
                        <FaCalendarAlt className="mr-2" />
                        {(new Date(event.start_date).toISOString().split('T')[0].split('-').reverse().join('/'))} ,
                        {formatTo12Hour(new Date(event.start_date).toISOString().split('T')[1])} – {(new Date(event.end_date).toISOString().split('T')[0].split('-').reverse().join('/'))} ,
                        {formatTo12Hour(new Date(event.end_date).toISOString().split('T')[1])}
                    </div>
                    <button
                        onClick={() => navigate('/admin/add-event')}
                        className="absolute top-4 right-4 px-4 py-2 bg-indigo-600 text-white font-bold rounded-full shadow-lg hover:bg-indigo-700 transition duration-200"
                    >
                        Back
                    </button>
                </div>
                <div className="p-8">
                    <h2 className="text-4xl font-extrabold text-indigo-400 mb-4 tracking-tight">
                        {event.event_name}
                    </h2>
                    <div className="flex flex-wrap items-center gap-6 mb-4 border-b border-gray-700 pb-4">
                        <div className="flex items-center gap-2 text-gray-400 text-lg">
                            <FaMapMarkerAlt className="text-indigo-500" />
                            <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-lg">
                            <FaUserTie className="text-indigo-500" />
                            <span>{event.hosted_by}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-lg">
                            <FaTicketAlt className="text-indigo-500" />
                            <span>Max Tickets: {event.max_tickets}</span>
                        </div>
                    </div>
                    <p className="text-gray-400 text-base italic mb-8 px-2">
                        {event.description}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                        <div className="bg-gray-800 rounded-xl p-4 shadow-lg flex flex-col items-center border border-indigo-700/50">
                            <FaUsers className="text-indigo-400 text-3xl mb-2" />
                            <span className="font-bold text-indigo-400">Meal Count</span>
                            <span className="text-xl text-white mt-1">{event.meal_count}</span>
                        </div>
                        <div className="bg-gray-800 rounded-xl p-4 shadow-lg flex flex-col items-center border border-indigo-700/50">
                            <FaGift className="text-indigo-400 text-3xl mb-2" />
                            <span className="font-bold text-indigo-400">Rewards</span>
                            <ul className="mt-2 list-none space-y-1 text-gray-300 text-sm w-full">
                                {event.rewards.map((reward, i) => (
                                    <li key={i} className="font-medium flex justify-between items-center border-b border-gray-700/50 last:border-b-0 py-1">
                                        <span>{reward.title}</span>
                                        <span className="text-indigo-500 font-bold">₹{reward.price}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-gray-800 rounded-xl p-4 shadow-lg flex flex-col items-center border border-indigo-700/50">
                            <FaUsers className="text-indigo-400 text-3xl mb-2" />
                            <span className="font-bold text-indigo-400 mb-1">Guests</span>
                            <ul className="list-disc pl-5 text-gray-300 text-sm">
                                {event.guests.map((guest, i) => (
                                    <li key={i}>{guest || `Guest ${ i + 1 }`}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-indigo-400 font-bold text-xl mb-3 border-b border-gray-700 pb-1">Volunteers</h3>
                            <ul className="list-disc pl-6 space-y-1">
                                {event.volunteers.map((v, i) => (
                                    <li key={i} className="text-gray-300">{v}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-indigo-400 font-bold text-xl mb-3 border-b border-gray-700 pb-1">Participants</h3>
                            <ul className="list-disc pl-6 space-y-1">
                                {event.participants.filter(p => p.status).map((p, i) => (
                                    <li key={i} className="text-green-400">ID: {p.id} (Attended)</li>
                                ))}
                            </ul>
                            <h3 className="text-indigo-400 font-bold text-md mt-4 mb-2">Registered (Not Attended)</h3>
                            <ul className="list-disc pl-6 space-y-1">
                                {event.participants.filter(p => !p.status).map((p, i) => (
                                    <li key={i} className="text-red-400/80">ID: {p.id} (Registered)</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default EventDetails;