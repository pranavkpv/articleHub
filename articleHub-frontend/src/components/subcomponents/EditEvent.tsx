import React, { useState, useEffect } from 'react';
import { MdClose } from "react-icons/md";
import type { editEventProp } from "../../interfaces/prop";
import AdminInput from "../../reusable/BlackInput";
import { toast } from "react-toastify";
import { updateEvent } from '../../api/admin';
import type { addEventData } from '../../interfaces/event';


function EditEvent({ editOn, setEditOn, event,fetchEventData }: editEventProp) {
   if (!editOn) return null;

   const [formData, setFormData] = useState<addEventData>({
      event_name: "",
      start_date: "",
      end_date: "",
      location: "",
      description: "",
      hosted_by: "",
      guests: [""],
      rewards: [{ title: "", price: "" }],
      meal_count: "",
      max_tickets: "",
      image: null as File | null,
   });

   useEffect(() => {
      if (event) {
         setFormData({
            event_name: event.event_name || "",
            start_date: event.start_date ? new Date(event.start_date).toISOString().slice(0, 16) : "",
            end_date: event.end_date ? new Date(event.end_date).toISOString().slice(0, 16) : "",
            location: event.location || "",
            description: event.description || "",
            hosted_by: event.hosted_by || "",
            guests: event.guests?.length ? [...event.guests] : [""],
            rewards: event.rewards?.length
               ? event.rewards.map((r: any) => ({ title: r.title, price: r.price }))
               : [{ title: "", price: "" }],
            meal_count: String(event.meal_count),
            max_tickets: String(event.max_tickets),
            image: null,
         });
      }
   }, [event]);

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
   };

   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      setFormData(prev => ({ ...prev, image: file }));
   };

   const addGuest = () => setFormData(prev => ({ ...prev, guests: [...prev.guests, ""] }));
   const removeGuest = (index: number) => {
      setFormData(prev => ({
         ...prev,
         guests: prev.guests.filter((_, i) => i !== index),
      }));
   };
   const updateGuest = (index: number, value: string) => {
      const updated = [...formData.guests];
      updated[index] = value;
      setFormData(prev => ({ ...prev, guests: updated }));
   };

   const addReward = () =>
      setFormData(prev => ({
         ...prev,
         rewards: [...prev.rewards, { title: "", price: "" }],
      }));
   const removeReward = (index: number) => {
      setFormData(prev => ({
         ...prev,
         rewards: prev.rewards.filter((_, i) => i !== index),
      }));
   };
   const updateReward = (index: number, field: string, value: string) => {
      const updated = [...formData.rewards];
      updated[index][field as "title" | "price"] = value;
      setFormData(prev => ({ ...prev, rewards: updated }));
   };

   const getCurrentDateTime = () => {
      const now = new Date();
      return now.toISOString().slice(0, 16);
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      const response = await updateEvent(event._id, formData);

      if (response.success) {
         toast.success(response.message);
         setEditOn(false);
         fetchEventData()
      } else {
         toast.error(response.message || "Failed to update event.");
      }
   };

   return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
         <div className="max-w-2xl w-full mx-auto bg-gray-900 text-gray-200 rounded-xl shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="p-6">
               <div className="flex justify-between items-center border-b border-gray-700 pb-4 mb-6">
                  <h2 className="text-2xl font-bold text-indigo-400">Update The Event</h2>
                  <button
                     aria-label='close'
                     onClick={() => setEditOn(false)}
                     className="text-gray-400 hover:text-red-500 transition duration-200 p-1 rounded-full bg-gray-800"
                  >
                     <MdClose className="w-6 h-6" />
                  </button>
               </div>

               <form onSubmit={handleSubmit} className="space-y-6">

                  <AdminInput handle={handleInputChange} id='event_name' labelname='Event Name' placeholder='Enter Event Name' type='text' value={formData.event_name} />

                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label htmlFor='start_date' className="block text-sm font-medium text-gray-400">Start Date & Time</label>
                        <input
                           type="datetime-local"
                           id="start_date"
                           name="start_date"
                           value={formData.start_date}
                           onChange={handleInputChange}
                           min={getCurrentDateTime()}
                           className="mt-1 w-full p-3 border border-gray-700 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                     </div>
                     <AdminInput handle={handleInputChange} id='end_date' labelname='End Date & Time' placeholder='Enter End Date' type='datetime-local' value={formData.end_date} />
                  </div>

                  <AdminInput handle={handleInputChange} id='location' labelname='Location' placeholder='Enter Location' type='text' value={formData.location} />

                  <div>
                     <label className="block text-sm font-medium text-gray-400">Description</label>
                     <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={4}
                        className="mt-1 block w-full rounded-lg border-gray-700 bg-gray-800 text-white shadow-sm focus:ring-indigo-500"
                        placeholder="Enter event description"
                     />
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-gray-400">Event Image</label>
                     <input
                        placeholder='upload image'
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="mt-1 block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-700 file:text-white hover:file:bg-indigo-600"
                     />
                  </div>
                  <p>change this image please upload other image after apdate the image should be change</p>
                  <img src={event.image} alt="" />
                  <AdminInput handle={handleInputChange} id='hosted_by' labelname='Hosted By' placeholder='Enter Organizer Name' type='text' value={formData.hosted_by} />

                  <div>
                     <label className="block text-sm font-medium text-gray-400">Guests</label>
                     {formData.guests.map((g, i) => (
                        <div key={i} className="flex items-center gap-2 mt-2">
                           <input
                              type="text"
                              value={g}
                              onChange={(e) => updateGuest(i, e.target.value)}
                              placeholder={`Guest ${ i + 1 }`}
                              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-indigo-500"
                           />
                           {formData.guests.length > 1 && (
                              <button type="button" onClick={() => removeGuest(i)} className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                                 Remove
                              </button>
                           )}
                        </div>
                     ))}
                     <button type="button" onClick={addGuest} className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500">
                        Add Guest
                     </button>
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-gray-400">Rewards</label>
                     {formData.rewards.map((r, i) => (
                        <div key={i} className="flex gap-2 mt-2">
                           <input
                              type="text"
                              value={r.title}
                              onChange={(e) => updateReward(i, "title", e.target.value)}
                              placeholder="Reward Title"
                              className="w-2/3 p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-indigo-500"
                           />
                           <input
                              type="number"
                              value={r.price}
                              onChange={(e) => updateReward(i, "price", e.target.value)}
                              placeholder="Price"
                              className="w-1/3 p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-indigo-500"
                           />
                           {formData.rewards.length > 1 && (
                              <button type="button" onClick={() => removeReward(i)} className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                                 Remove
                              </button>
                           )}
                        </div>
                     ))}
                     <button type="button" onClick={addReward} className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500">
                        Add Reward
                     </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <AdminInput handle={handleInputChange} id='meal_count' labelname='Meal Count' placeholder='Meals provided' type='number' value={formData.meal_count} />
                     <AdminInput handle={handleInputChange} id='max_tickets' labelname='Max Tickets' placeholder='Enter maximum tickets' type='number' value={formData.max_tickets} />
                  </div>

                  <button type="submit" className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 shadow-md">
                     Update Event
                  </button>
               </form>
            </div>
         </div>
      </div>
   );
}

export default EditEvent;
