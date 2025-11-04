import { jwtDecode } from "jwt-decode";
import { QRCodeCanvas } from "qrcode.react";
import { useRef } from "react";
import type { tokenExist } from "../../interfaces/user";
import { FaDownload } from "react-icons/fa"

interface prop {
  event: string
}
function QRCodeGenerator({ event }: prop) {
  const qrRef = useRef<HTMLCanvasElement | null>(null);
  const token = localStorage.getItem('token')
  if (!token) return null;
  const decoded: tokenExist = jwtDecode(token)
  const value = [event, decoded._id]

  const handleDownload = () => {
    if (!qrRef.current) return;
    const dataUrl = qrRef.current.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "qrcode.png";
    link.click();
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <QRCodeCanvas value={value.join('-')} size={180} ref={qrRef} className="rounded-lg shadow-lg" />
      <button
        onClick={handleDownload}
        className="flex items-center mt-2 px-5 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-full shadow font-semibold hover:scale-105 transition"
      >
        <FaDownload className="mr-2" /> Download QR Code
      </button>
    </div>
  );
}
export default QRCodeGenerator;
