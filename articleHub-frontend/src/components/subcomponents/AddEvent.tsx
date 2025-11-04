import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { addEventData, Reward } from '../../interfaces/event';
import type { addProp } from '../../interfaces/prop';
import { toast } from 'react-toastify';
import { saveEvent } from '../../api/admin';
import { MdClose } from 'react-icons/md'; // Import a close icon for better visuals
import AdminInput from '../../reusable/BlackInput';

function AddEvent({ addOn, setAddOn }: addProp) {
    if (!addOn) return null
    const [formData, setFormData] = useState<addEventData>({
        event_name: '',
        start_date: '',
        end_date: '',
        location: '',
        description: '',
        rewards: [{ title: '', price: '' }],
        image: null,
        hosted_by: '',
        guests: [''],
        meal_count: '',
        max_tickets: '',
    });

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData({ ...formData, image: file });
    };

    const addReward = () => {
        setFormData({
            ...formData,
            rewards: [...formData.rewards, { title: '', price: '' }],
        });
    };

    const updateReward = (index: number, field: keyof Reward, value: string) => {
        const newRewards = [...formData.rewards];
        newRewards[index][field] = value;
        setFormData({ ...formData, rewards: newRewards });
    };

    const removeReward = (index: number) => {
        setFormData({
            ...formData,
            rewards: formData.rewards.filter((_, i) => i !== index),
        });
    };

    const addGuest = () => {
        setFormData({ ...formData, guests: [...formData.guests, ''] });
    };

    const updateGuest = (index: number, value: string) => {
        const newGuests = [...formData.guests];
        newGuests[index] = value;
        setFormData({ ...formData, guests: newGuests });
    };

    const removeGuest = (index: number) => {
        setFormData({
            ...formData,
            guests: formData.guests.filter((_, i) => i !== index),
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const response = await saveEvent(formData)
        if (response.success) {
            toast.success(response.message)
            setAddOn(false)
        } else {
            toast.error(response.message)
        }
    };

    const getCurrentDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        return `${ year }-${ month }-${ day }T${ hours }:${ minutes }`;
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="max-w-2xl w-full mx-auto bg-gray-900 text-gray-200 rounded-xl shadow-2xl overflow-y-auto max-h-[90vh]">
                <div className="p-6">
                    <div className="flex justify-between items-center border-b border-gray-700 pb-4 mb-6">
                        <h2 className="text-2xl font-bold text-indigo-400">Create New Event</h2>
                        <button
                            onClick={() => setAddOn(false)}
                            className="text-gray-400 hover:text-red-500 transition duration-200 p-1 rounded-full bg-gray-800"
                            aria-label="Close"
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
                                    placeholder="Enter start date"
                                    min={getCurrentDateTime()}
                                    className="mt-1 w-full p-3 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                                />
                            </div>
                            <AdminInput handle={handleInputChange} id='end_date' labelname='End Date & Time' placeholder='enter end date' type='datetime-local' value={formData.end_date} />
                        </div>

                        <AdminInput handle={handleInputChange} id='location' labelname='location' placeholder='Enter Event Location' type='text' value={formData.location} />

                        <div>
                            <label className="block text-sm font-medium text-gray-400">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder='enter description'
                                className="mt-1 block w-full rounded-lg border-gray-700 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                rows={4}
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400">
                                Event Image
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                placeholder='select image'
                                className="mt-1 block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-700 file:text-white hover:file:bg-indigo-600 transition"
                            />
                        </div>

                        <AdminInput handle={handleInputChange} id='hosted_by' labelname=' Hosted By' placeholder='Enter Event Hosting Organization' type='text' value={formData.hosted_by} />

                        <div>
                            <label className="block text-sm font-medium text-gray-400">
                                Guests
                            </label>
                            {formData.guests.map((guest, index) => (
                                <div key={index} className="flex items-center space-x-2 mt-2">
                                    <input
                                        type="text"
                                        value={guest}
                                        onChange={(e) => updateGuest(index, e.target.value)}
                                        className="block p-3 w-full rounded-lg border-gray-700 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        placeholder={`Guest ${ index + 1 }`}
                                    />
                                    {formData.guests.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeGuest(index)}
                                            className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addGuest}
                                className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition font-medium"
                            >
                                Add Guest
                            </button>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400">
                                Rewards
                            </label>
                            {formData.rewards.map((reward, index) => (
                                <div key={index} className="flex space-x-2 mt-2">
                                    <input
                                        type="text"
                                        value={reward.title}
                                        onChange={(e) => updateReward(index, 'title', e.target.value)}
                                        className="block w-2/3 p-3 rounded-lg border-gray-700 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        placeholder="Reward Title"
                                    />
                                    <input
                                        type="number"
                                        value={reward.price}
                                        onChange={(e) => updateReward(index, 'price', e.target.value)}
                                        className="block w-1/3 p-3 rounded-lg border-gray-700 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        placeholder="Price"
                                    />
                                    {formData.rewards.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeReward(index)}
                                            className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addReward}
                                className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition font-medium"
                            >
                                Add Reward
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <AdminInput handle={handleInputChange} id='meal_count' labelname='Meal Count' placeholder='Enter Event Meal ProvidingCount' type='number' value={formData.meal_count} />
                            <AdminInput handle={handleInputChange} id='max_tickets' labelname='Maximum Tickets' placeholder='Enter Event Maximum Number of Ticket' type='number' value={formData.max_tickets} />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition shadow-md"
                        >
                            Create Event
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddEvent;