import type { qrConfirmOn } from "../../interfaces/prop"
import QRCodeGenerator from "../subcomponents/QrcodeGenerator"
import { FaCheckCircle } from "react-icons/fa"

function QrCode({ addOn, setAddOn, event, setconfirmOn }: qrConfirmOn) {
  if (!addOn) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        <div className="flex flex-col items-center gap-4">
          <FaCheckCircle className="text-green-500 text-4xl mb-1 animate-bounce" />
          <h2 className="text-2xl font-bold text-indigo-700">Registration Successful!</h2>
          <p className="text-gray-700 mb-2">Here is your event QR code:</p>
          <QRCodeGenerator event={event} />
          <button
            onClick={() => {
              setAddOn(false)
              setconfirmOn(false)
            }}
            className="mt-4 py-2 px-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold shadow hover:scale-105 transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}
export default QrCode
