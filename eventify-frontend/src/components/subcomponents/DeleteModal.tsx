import type React from "react"


interface prop {
   deleteOn: boolean
   setDeleteOn: React.Dispatch<React.SetStateAction<boolean>>
   deleteFun: () => void
   data: string
}

function DeleteModal({ deleteOn, setDeleteOn, deleteFun, data }: prop) {
   if (!deleteOn) return null

   return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-gray-900  rounded-lg shadow-xl max-w-md w-full p-6">
        <p className="text-gray-200 text-lg mb-6">
          Are you sure you want to delete <span className="font-semibold">{data}</span>?
        </p>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 rounded bg-gray-900 text-gray-100 hover:bg-gray-300 transition"
            onClick={() => setDeleteOn(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
            onClick={deleteFun}
          >
            Delete
          </button>
        </div>
      </div>
    </div>

   )
}

export default DeleteModal