import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt, FaUtensils, FaTicketAlt, FaUserTie, FaGift, FaUsers } from "react-icons/fa";
import Confirm from "../subcomponents/Confirm";
import QrCode from "./Qrcode";
import type { Reward } from "../../interfaces/event";

function UserEventDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { event, status } = location.state;
  const [confirmOn, setConfirmOn] = useState(false);
  const [qrOn, setQrOn] = useState(false)

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
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-purple-100 to-indigo-300 flex items-center justify-center px-2 py-8">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl ring-1 ring-indigo-100 overflow-hidden">
        <div className="relative">
          <img
            src={event.image}
            alt={event.event_name}
            className="w-full h-72 object-cover rounded-t-3xl shadow transition duration-200 hover:scale-105"
          />
          <button
            onClick={() => navigate('/user/home')}
            className="absolute top-4 left-4 py-2 px-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-400 text-white font-bold rounded-full shadow hover:scale-105 transition duration-150"
          >
            Back to Events
          </button>
        </div>
        <div className="p-8">
          <h2 className="text-3xl font-extrabold text-indigo-700 mb-4 drop-shadow">
            {event.event_name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-7">
            <div className="space-y-3">
              {status == "Completed" ? <></>
                :
                <>
                  <p className="flex items-center text-gray-700 text-lg">
                    <FaCalendarAlt className="mr-2 text-indigo-500" />
                    <span className="font-semibold">Start:</span>  {(new Date(event.start_date).toISOString().split('T')[0].split('-').reverse().join('/'))} ,
                    {formatTo12Hour(new Date(event.start_date).toISOString().split('T')[1])}
                  </p>
                  <p className="flex items-center text-gray-700 text-lg">
                    <FaCalendarAlt className="mr-2 text-indigo-500" />
                    <span className="font-semibold">End:</span> {(new Date(event.end_date).toISOString().split('T')[0].split('-').reverse().join('/'))} ,
                    {formatTo12Hour(new Date(event.end_date).toISOString().split('T')[1])}
                  </p>
                </>
              }


              <p className="flex items-center text-gray-700 text-lg">
                <FaMapMarkerAlt className="mr-2 text-indigo-500" />
                <span className="font-semibold">Location:</span> {event.location}
              </p>
              <p className="flex items-center text-gray-700 text-lg">
                <FaUserTie className="mr-2 text-indigo-500" />
                <span className="font-semibold">Hosted By:</span> {event.hosted_by}
              </p>
            </div>

            <div className=" rounded-xl p-4 shadow-lg flex flex-col items-center border border-indigo-700/50">
              <FaGift className="text-indigo-400 text-3xl mb-2" />
              <span className="font-bold text-indigo-400">Rewards</span>
              <ul className="mt-2 list-none space-y-1 text-gray-300 text-sm w-full">
                {event.rewards.map((reward: Reward, i: number) => (
                  <li key={i} className="font-medium flex justify-between items-center border-b border-gray-700/50 last:border-b-0 py-1">
                    <span className="text-gray-700">{reward.title}</span>
                    <span className="text-indigo-500 font-bold">₹{reward.price}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              {status == "Completed" ? <></> : <p className="flex items-center text-gray-700 text-lg">
                <FaUtensils className="mr-2 text-indigo-500" />
                <span className="font-semibold">Meal Count:</span> {event.meal_count}
              </p>}

              {status == "Completed" || !status ? <></> : <p className="flex items-center text-gray-700 text-lg">
                <FaTicketAlt className="mr-2 text-indigo-500" />
                <span className="font-semibold">Total Partcipants:</span> {event.max_tickets}
              </p>}

            </div>
            <div className="rounded-xl p-4 shadow-lg flex flex-col items-center border border-indigo-700/50">
              <FaUsers className="text-indigo-400 text-3xl mb-2" />
              <span className="font-bold text-indigo-400 mb-1">Guests</span>
              <ul className="list-disc pl-5 text-gray-700 text-sm">
                {event.guests.map((guest: string, i: number) => (
                  <li key={i}>{guest}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-indigo-50 rounded-xl p-5 shadow mb-8">
            <span className="block text-gray-900 text-lg font-semibold mb-2">Description:</span>
            <p className="text-gray-700 italic">{event.description}</p>
          </div>
          {status === "Upcoming" && (
            <button
              onClick={() => setConfirmOn(true)}
              className="w-full py-3 px-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-2xl shadow-xl hover:scale-105 transition duration-150"
            >
              Register
            </button>
          )}
          {status === "Ongoing" && (
            <button
              onClick={() => setConfirmOn(true)}
              className="w-full py-3 px-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-2xl shadow-xl hover:scale-105 transition duration-150"
            >
              Register
            </button>
          )}
          <Confirm addOn={confirmOn} setAddOn={setConfirmOn} event={event._id} />
          <QrCode addOn={qrOn} event={event._id} setAddOn={setQrOn} setconfirmOn={setConfirmOn} />
          {!status ? <button
            onClick={() => setQrOn(true)}
            className="w-full py-3 px-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-2xl shadow-xl hover:scale-105 transition duration-150"
          >
            Regenerate QR Code
          </button> : <></>}
        </div>
      </div>
    </div>
  );
}
export default UserEventDetails;
