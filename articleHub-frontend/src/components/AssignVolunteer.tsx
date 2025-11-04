import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import type { fetchAdminEvent } from '../interfaces/response';
import type { listEventOnAdmin } from '../interfaces/event';
import { getAdminEvent } from '../api/admin';
import EventList from './subcomponents/EventList';

const AssignVolunteers: React.FC = () => {
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
    }, []);
    
    return (
        <div className="p-6 bg-gray-800 min-h-screen">
            <h2 className="text-3xl font-extrabold text-indigo-400 border-b-2 border-indigo-400 pb-2 mb-8">
                Assign Volunteers to Events
            </h2>
            <div className="bg-gray-900 p-6 rounded-xl shadow-2xl">
                <p className="text-gray-400 italic mb-6 border-b border-gray-700 pb-4">
                    Select an event below to manage volunteer assignments for that event.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {events.length > 0 ? (
                        events.map((event, index) => (
                            <EventList key={index} event={event} data="volunteer" fetchEventData={fetchEventData}/>
                        ))
                    ) : (
                        <p className="text-gray-400 text-center col-span-full py-10 bg-gray-800 rounded-lg shadow-inner">
                            No events are currently scheduled for volunteer assignment.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AssignVolunteers;