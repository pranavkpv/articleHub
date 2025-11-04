import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { ticketData } from '../../interfaces/event';

const YourTickets: React.FC = () => {
  const navigate = useNavigate();

  const tickets: { event: ticketData; ticketId: string }[] = [
    {
      event: {
        event_name: 'Sample Event',
        start_date: new Date(),
        end_date: new Date(),
        location: 'Sample Location',
        description: 'This is a sample event.',
        image: 'https://via.placeholder.com/300',
        hosted_by: 'John Doe',
        guests: ['Guest 1', 'Guest 2'],
        rewards: [{ title: 'VIP Pass', price: '100' }],
        meal_count: 50,
        max_tickets: 200,
      },
      ticketId: 'T001',
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Tickets</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <div
              key={ticket.ticketId}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={ticket.event.image}
                alt={ticket.event.event_name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {ticket.event.event_name}
                </h3>
                <p className="text-gray-700 text-sm mb-1">
                  <span className="font-medium">Ticket ID:</span> {ticket.ticketId}
                </p>
                <p className="text-gray-700 text-sm mb-1">
                  <span className="font-medium">Location:</span> {ticket.event.location}
                </p>
                <p className="text-gray-700 text-sm mb-4">
                  <span className="font-medium">Start:</span>{' '}
                  {new Date(ticket.event.start_date).toLocaleString()}
                </p>
                <button
                  onClick={() =>
                    navigate('/event-details', { state: { event: ticket.event } })
                  }
                  className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-500 transition duration-300"
                >
                  View Event Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center col-span-full">
            No tickets purchased.
          </p>
        )}
      </div>
    </div>
  );
};

export default YourTickets;