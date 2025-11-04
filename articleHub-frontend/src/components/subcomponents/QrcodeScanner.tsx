import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import type { scanProp } from "../../interfaces/prop";
import { toast } from "react-toastify";
import { takeAttendance, takeFoodToken } from "../../api/volunteer";

function QRCodeScanner({ scanOn, setScanOn, event, eventBase }: scanProp) {
  if (!scanOn) return null;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const scannerRef = useRef<QrScanner | null>(null);
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!videoRef.current) return;

    // Create scanner and store in ref
    scannerRef.current = new QrScanner(
      videoRef.current,
      (qrResult) => setResult(qrResult.data),
      {
        preferredCamera: "environment",
        highlightScanRegion: true,
        highlightCodeOutline: true,
      }
    );

    scannerRef.current.start().catch(console.error);

    // Cleanup on unmount
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop();
        scannerRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (!result || loading) return;

    const sendResult = async () => {
      setLoading(true);
      scannerRef.current?.stop(); 

      try {
        if (result.split("-")[0] !== event) {
          toast.error("User does not exist");
          scannerRef.current?.start(); 
          setLoading(false);
          return;
        }

        let response;
        if (eventBase === "event") {
          response = await takeAttendance(result);
        } else if (eventBase === "food") {
          response = await takeFoodToken(result);
        }

        if (response?.success) {
          toast.success(response.message);
          setScanOn(false); 
        } else {
          toast.error(response?.message || "Something went wrong");
          scannerRef.current?.start(); 
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong!");
        scannerRef.current?.start(); 
      } finally {
        setLoading(false);
      }
    };

    sendResult();
  }, [result]);

  const handleCancel = () => {
    if (scannerRef.current) {
      scannerRef.current.stop();
      scannerRef.current.destroy();
      console.log("Scanner cancelled and destroyed");
    }
    setScanOn(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-lg z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center max-w-md w-full">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">QR Code Scanner</h2>
        <video
          ref={videoRef}
          className="w-64 h-64 rounded-xl border-4 border-indigo-200 object-cover mb-6 shadow"
        />
        <button
          onClick={handleCancel}
          disabled={loading}
          className="py-2 px-7 bg-gradient-to-r from-gray-400 to-gray-600 text-white rounded-full font-semibold shadow mt-6 hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default QRCodeScanner;
