import React, { useEffect, useState } from 'react';
import AddVolunteerModal from './subcomponents/AddVoluntModal';
import { toast } from 'react-toastify';
import type { listVolunter } from '../interfaces/user';
import { fetchVolunteer } from '../api/volunteer';
import type { fetchVounteerReponse } from '../interfaces/response';
import DeleteModal from './subcomponents/DeleteModal';
import { deleteVolunteer } from '../api/admin';
import EditVolunteerModal from './subcomponents/EditVolunteerModal';


const AddVolunteer: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [volunteers, setVolunteers] = useState<listVolunter[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState('');
    const [volunteerId, setVolundeerId] = useState('')
    const [deleteOn, setDeleteOn] = useState(false)

    const [editOn, setEditOn] = useState(false)
    const [editData, setEditData] = useState<listVolunter>({ _id: "", email: "", phone: "", username: "" })




    const loadVolunteers = async () => {
        setLoading(true);
        const response: fetchVounteerReponse = await fetchVolunteer({ page, search });
        if (response.success) {
            setVolunteers(response.data);
            setTotal(response.total);
        } else {
            toast.error(response.message || 'Error fetching volunteers');
        }
        setLoading(false);
    };

    useEffect(() => {
        loadVolunteers();
    }, [page, search, isOpen]);


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setPage(1);
    };

    const deleteFun = async () => {
        const response = await deleteVolunteer(volunteerId)
        if (response.success) {
            toast.success(response.message)
            setDeleteOn(false)
            loadVolunteers()
        } else {
            toast.error(response.message)
        }
    }

    return (
        <div className="p-6 bg-gray-800 min-h-screen">
            <h2 className="text-3xl font-extrabold text-indigo-400 border-b-2 border-indigo-400 pb-2 mb-8">
                Manage Volunteers
            </h2>
            <div className="bg-gray-900 p-6 rounded-xl shadow-2xl max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
                        aria-label="Open Add Volunteer Modal"
                    >
                        + Add Volunteer
                    </button>

                    <input
                        type="text"
                        placeholder="Search volunteers..."
                        value={search}
                        onChange={handleSearchChange}
                        className="border border-gray-700 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <table className="w-full table-auto border-separate border-spacing-0 overflow-hidden rounded-lg shadow-xl">
                    <thead>
                        <tr className="bg-gray-800 text-indigo-400">
                            <th className="px-4 py-3 text-left border-b border-gray-700">Sl No</th>
                            <th className="px-4 py-3 text-left border-b border-gray-700">Volunteer Name</th>
                            <th className="px-4 py-3 text-left border-b border-gray-700">Email</th>
                            <th className="px-4 py-3 text-left border-b border-gray-700">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="text-center py-4 text-gray-400 italic bg-gray-900">
                                    Loading volunteers...
                                </td>
                            </tr>
                        ) : volunteers.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center py-4 text-gray-500 italic bg-gray-900">
                                    No volunteers found.
                                </td>
                            </tr>
                        ) : (
                            volunteers.map((vol, index) => (
                                <tr key={vol._id} className="text-gray-300 transition duration-150 ease-in-out odd:bg-gray-900 even:bg-gray-800 hover:bg-gray-700/70">
                                    <td className="px-4 py-3 border-b border-gray-700">{(page - 1) * 10 + index + 1}</td>
                                    <td className="px-4 py-3 border-b border-gray-700 font-medium">{vol.username}</td>
                                    <td className="px-4 py-3 border-b border-gray-700">{vol.email}</td>
                                    <td className="px-4 py-3 border-b border-gray-700 gap-3 flex">
                                        <button onClick={() => {
                                            setVolundeerId(vol._id)
                                            setDeleteOn(true)
                                        }} className="text-indigo-400 hover:text-indigo-300 font-medium">Delete</button>
                                        <button onClick={() => {
                                            setEditData(vol)
                                            setEditOn(true)
                                        }} className="text-indigo-400 hover:text-indigo-300 font-medium">Edit</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                {total >= 1 && (
                    <div className="flex justify-center space-x-2 mt-6">
                        <button
                            disabled={page === 1 || loading}
                            onClick={() => setPage(page - 1)}
                            className={`px-3 py-1 rounded-lg border transition ${ page === 1 ? 'text-gray-600 border-gray-700 bg-gray-800 cursor-not-allowed' : 'text-indigo-400 border-indigo-600 hover:bg-indigo-900/50'
                                }`}
                        >
                            Previous
                        </button>
                        {[...Array(total)].map((_, i) => {
                            const pageNum = i + 1;
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => setPage(pageNum)}
                                    disabled={loading}
                                    className={`px-3 py-1 rounded-lg border transition font-semibold ${ page === pageNum
                                        ? 'bg-indigo-600 text-white border-indigo-600'
                                        : 'text-indigo-400 border-indigo-600 hover:bg-indigo-900/50'
                                        }`}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}
                        <button
                            disabled={page === total || loading}
                            onClick={() => setPage(page + 1)}
                            className={`px-3 py-1 rounded-lg border transition ${ page === total
                                ? 'text-gray-600 border-gray-700 bg-gray-800 cursor-not-allowed'
                                : 'text-indigo-400 border-indigo-600 hover:bg-indigo-900/50'
                                }`}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
            <DeleteModal data='volunteer' deleteFun={deleteFun} deleteOn={deleteOn} setDeleteOn={setDeleteOn} />

            <AddVolunteerModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
            <EditVolunteerModal editOn={editOn} setEditOn={setEditOn} data={editData} loadVolunteers={loadVolunteers} />
        </div>
    );
};

export default AddVolunteer;