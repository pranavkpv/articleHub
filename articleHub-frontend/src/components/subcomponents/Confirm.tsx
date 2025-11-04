import { toast } from "react-toastify"
import type { eventConfirmProp } from "../../interfaces/prop"
import QrCode from "../user/Qrcode"
import { useState } from "react"
import { bookEvent } from "../../api/user"
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"

function Confirm({ addOn, setAddOn, event }: eventConfirmProp) {
  if (!addOn) return null
  const [qrOn, setQrOn] = useState(false)

  const registerFun = async () => {
    const res = await bookEvent(event)
    if (res.success) {
      toast.success(res.message)
      setQrOn(true)
    } else {
      toast.error(res.message)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-fadeIn">
        <div className="flex flex-col items-center gap-4">
          <FaCheckCircle className="text-indigo-600 text-4xl mb-2 animate-bounce" />
          <h2 className="text-2xl font-bold text-indigo-800 mb-2">Confirm Registration?</h2>
          <p className="text-gray-700 text-center mb-4">Are you sure you want to register for this event?</p>
          <div className="flex gap-6 w-full justify-center mt-4">
            <button
              onClick={() => setAddOn(false)}
              className="flex-1 py-2 rounded-full font-semibold bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow hover:scale-105 transition"
            >
              <FaTimesCircle className="inline-block mr-2" /> Cancel
            </button>
            <button
              onClick={registerFun}
              className="flex-1 py-2 rounded-full font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow hover:scale-105 transition"
            >
              <FaCheckCircle className="inline-block mr-2" /> Confirm
            </button>
          </div>
        </div>
        <QrCode addOn={qrOn} setAddOn={setQrOn} event={event} setconfirmOn={setAddOn} />
      </div>
    </div>
  )
}
export default Confirm
