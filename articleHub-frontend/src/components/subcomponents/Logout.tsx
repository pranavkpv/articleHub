import { toast } from "react-toastify"
import { LogoutApi } from "../../api/userAuth"
import { MdClose } from 'react-icons/md';
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function Logout({ addOn: isOpen, setAddOn: setIsOpen }: addProp) {
    if (!isOpen) return null;
    const navigate = useNavigate()

    const logoutFun = async () => {
        setIsOpen(false);

        const response = await LogoutApi();

        if (response.success) {
            localStorage.removeItem('token');
            toast.success(response.message || "You have been successfully logged out.");
            navigate('/login')
        } else {
            toast.error(response.message || "Logout failed on the server.");
        }
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[100]"
            onClick={handleCancel}
        >
            <div
                className="bg-gray-800 text-gray-200 rounded-xl shadow-2xl w-full max-w-sm p-6 border border-gray-700"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center border-b border-gray-700 pb-3 mb-4">
                    <h3 className="text-xl font-bold text-indigo-400">Confirm Logout</h3>
                    <button
                        onClick={handleCancel}
                        className="text-gray-400 hover:text-red-500 transition duration-200 p-1 rounded-full bg-gray-700"
                        aria-label="Close"
                    >
                        <MdClose className="w-5 h-5" />
                    </button>
                </div>
                <p className="text-gray-300 text-lg mb-6">
                    Are you sure you want to log out of the Admin Panel?
                </p>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={handleCancel}
                        className="px-4 py-2 rounded-lg text-gray-400 border border-gray-700 hover:bg-gray-700 transition font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={logoutFun}
                        className="px-6 py-2 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 transition shadow-md"
                    >
                        <IoIosLogOut className="inline w-5 h-5 mr-1 align-sub" /> Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
export default Logout;