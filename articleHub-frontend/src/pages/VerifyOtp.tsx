import React, { useState, useEffect, type FormEvent } from 'react';
import articleBg from '../assets/ArticleHub.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ResendUserOTP, VerifyUserOTP } from '../api/userAuth';
import type { commonResponse } from '../interfaces/output';
import Input from '../reusable/Input';

const VerifyOTP: React.FC = () => {
   const [otp, setOtp] = useState<string>('');
   const [error, setError] = useState<string>('');
   const [timer, setTimer] = useState<number>(60);
   const [isTimerActive, setIsTimerActive] = useState<boolean>(true);
   const location = useLocation()
   const navigate = useNavigate()

   useEffect(() => {
      let interval = null;
      if (isTimerActive && timer > 0) {
         interval = setInterval(() => {
            setTimer((prev) => prev - 1);
         }, 1000);
      } else if (timer === 0) {
         setIsTimerActive(false);
      }
      return () => {
         if (interval) clearInterval(interval);
      };
   }, [isTimerActive, timer]);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setOtp(value);
      setError('');
   };

   const validateForm = async (e: FormEvent) => {
      e.preventDefault();
      if (!/^\d{6}$/.test(otp)) {
         setError('Please enter a valid 6-digit OTP.');
         return;
      }
      setError('');
      const response: commonResponse = await VerifyUserOTP({ email: location.state.email, otp })
      if (response.success) {
         toast.success(response.message)
         navigate('/login')
      } else {
         toast.error(response.message)
      }
   };

   const handleResend = async () => {
      setTimer(60);
      setIsTimerActive(true);
      setOtp('');
      setError('');
      const response: commonResponse = await ResendUserOTP(location.state.email)
      if (response.success) {
         toast.success(response.message)
      } else {
         toast.error(response.message)
      }
   };

   return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
         <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Left Side: Image */}
            <div className="hidden md:block w-1/2">
               <img
                  src={articleBg}
                  alt="Event Management"
                  className="object-cover w-full h-full"
               />
            </div>
            {/* Right Side: Form */}
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
               <h1 className="text-4xl font-bold text-center text-indigo-600">Eventify</h1>
               <h2 className="text-2xl font-semibold text-center text-gray-800 mt-2">Verify OTP</h2>
               <p className="text-center text-gray-600 mb-4">Enter the 6-digit OTP sent to your email/phone</p>
               <p className="text-center text-red-500 mb-4 font-semibold">Do not refresh the page</p>

               {error && <p className="text-red-500 text-center mb-4">{error}</p>}

               <form onSubmit={validateForm} className="space-y-4">
                  <Input handle={handleChange} id='otp' labelname='OTP' placeholder='Enter 6-digit OTP' type='text' value={otp} />
                  <div className="text-center text-gray-600">
                     {isTimerActive ? (
                        <p>Time remaining: {timer} seconds</p>
                     ) : (
                        <p>OTP expired. <button onClick={handleResend} className="text-indigo-600 hover:underline">Resend OTP</button></p>
                     )}
                  </div>
                  <button
                     type="submit"
                     disabled={!isTimerActive}
                     className={`w-full py-3 text-white font-semibold rounded-lg transition duration-300 ${ isTimerActive ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'
                        }`}
                  >
                     Verify OTP
                  </button>
               </form>
               <p className="text-center text-gray-600 mt-4">
                  Back to <a href="#" className="text-indigo-600 hover:underline">Sign Up</a>
               </p>
            </div>
         </div>
      </div>
   );
};

export default VerifyOTP;