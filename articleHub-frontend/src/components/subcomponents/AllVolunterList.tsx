import { useEffect, useState } from 'react';
import type { volunteerGet } from '../../interfaces/user';
import { toast } from 'react-toastify';
import { assignVolunteerToEvent, getAllVolunteers } from '../../api/volunteer';
import { MdClose } from 'react-icons/md';
import type { listVolunteerProp } from '../../interfaces/prop';

function VolunteerModal({ listOn, setListOn, event,fetchEventData }: listVolunteerProp) {
   if (!listOn) return null;

   const [selected, setSelected] = useState<Set<string>>(new Set());
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const [volunteers, setVolunteers] = useState<volunteerGet[]>([]);

   const fetchAllVolunteers = async () => {
      const response = await getAllVolunteers();
      if (response.success) {
         setVolunteers(response.data);
         if (event.volunteers && event.volunteers.length > 0) {
            const existingVolunteers = response.data
               .filter((vol) => event.volunteers.includes(vol.username))
               .map((vol) => vol._id);
            setSelected(new Set(existingVolunteers));
         }
      } else {
         toast.error(response.message);
      }
   };

   const handleCheckboxChange = (id: string) => {
      setSelected((prev) => {
         const updated = new Set(prev);
         if (updated.has(id)) updated.delete(id);
         else updated.add(id);
         return updated;
      });
   };

   useEffect(() => {
      fetchAllVolunteers();
   }, []);

   const handleSubmit = async () => {
      setError(null);
      setLoading(true);

      const selectedIDs = volunteers
         .filter((vol) => selected.has(vol._id))
         .map((vol) => vol._id);

      const payload = selectedIDs.length > 0 ? selectedIDs : [];

      const response = await assignVolunteerToEvent(payload, event._id);

      setLoading(false);

      if (response.success) {
         toast.success(response.message);
         fetchEventData()
         setListOn(false);
      } else {
         toast.error(response.message);
         setError(response.message);
      }
   };

   const handleClose = () => {
      setListOn(false);
   };

   return (
      <div
         className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
         onClick={handleClose}
      >
         <div
            className="bg-gray-900 text-gray-200 rounded-xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto border border-gray-700"
            onClick={(e) => e.stopPropagation()}
         >
            <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
               <h2 className="text-2xl font-bold text-indigo-400">
                  Assign Volunteers to: {event.event_name}
               </h2>
               <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-red-500 transition duration-200 p-1 rounded-full bg-gray-800"
                  aria-label="Close"
               >
                  <MdClose className="w-6 h-6" />
               </button>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto border border-gray-700 bg-gray-800 rounded-lg p-4 mb-5">
               {volunteers.length === 0 && (
                  <p className="text-gray-500 italic text-center py-4">No volunteers available.</p>
               )}

               {volunteers.map((volunteer) => (
                  <label
                     key={volunteer._id}
                     className="flex items-center space-x-3 cursor-pointer transition hover:bg-gray-700/50 rounded-lg px-2 py-2 border-b border-gray-800 last:border-b-0"
                  >
                     <input
                        type="checkbox"
                        checked={selected.has(volunteer._id)}
                        onChange={() => handleCheckboxChange(volunteer._id)}
                        className="form-checkbox h-5 w-5 text-indigo-500 rounded border-gray-600 bg-gray-700 focus:ring-indigo-500"
                     />
                     <span className="text-gray-200 font-medium">{volunteer.username}</span>
                  </label>
               ))}
            </div>

            {error && <p className="text-red-400 mb-3">{error}</p>}

            <div className="flex justify-end space-x-3 mt-6">
               <button
                  onClick={handleClose}
                  className="px-4 py-2 rounded-lg text-gray-400 border border-gray-700 hover:bg-gray-700/50 transition font-medium"
               >
                  Cancel
               </button>
               <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`px-6 py-2 rounded-lg text-white font-bold transition ${
                     loading || selected.size === 0
                        ? 'bg-indigo-700 opacity-60 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg'
                  }`}
               >
                  {loading ? 'Assigning...' : `Assign (${selected.size}) Volunteer(s)`}
               </button>
            </div>
         </div>
      </div>
   );
}

export default VolunteerModal;
