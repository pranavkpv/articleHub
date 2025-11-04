import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { addVolunteer } from '../../api/volunteer';

type AddVolunteerModalProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
};

const AddVolunteerModal: React.FC<AddVolunteerModalProps> = ({ isOpen, setIsOpen }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        const response = await addVolunteer({ username, email, phone });
        console.log(response)
        if (response.success) {
            toast.success(response.message)
            setUsername('');
            setEmail('');
            setPhone('');
            setIsOpen(false);
        } else {
            toast.error(response.message)
            setError(response.message || 'Failed to add volunteer.');
        }
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4" onClick={() => setIsOpen(false)}>
            <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-md p-6 border border-gray-700" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-2xl font-bold mb-6 text-center text-indigo-400">Add New Volunteer</h2>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="username" className="block font-medium mb-1 text-gray-300">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full border border-gray-700 bg-gray-900 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                            placeholder="Enter username"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block font-medium mb-1 text-gray-300">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-700 bg-gray-900 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                            placeholder="Enter email"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block font-medium mb-1 text-gray-300">
                            Phone
                        </label>
                        <input
                            id="phone"
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full border border-gray-700 bg-gray-900 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                            placeholder="Enter phone number"
                        />
                    </div>
                    {error && <p className="text-red-400 text-sm">{error}</p>}
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-indigo-600 text-white font-bold py-3 rounded-lg shadow-md transition-all duration-200 ${ loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-indigo-700 hover:shadow-lg'
                                }`}
                        >
                            {loading ? 'Adding Volunteer...' : 'Confirm and Add'}
                        </button>
                    </div>
                </form>
                <button
                    onClick={() => setIsOpen(false)}
                    className="mt-4 w-full text-center text-gray-400 hover:text-indigo-400 transition-colors text-sm"
                    aria-label="Close modal"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default AddVolunteerModal;