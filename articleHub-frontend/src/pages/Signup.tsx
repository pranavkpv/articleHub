import React, { useState, type FormEvent } from 'react';
import eventBg from '../assets/event-bg.png'
import Input from '../reusable/Input';
import UserSubmitButton from '../components/UserSubmitButton';
import { toast } from 'react-toastify';
import type { commonResponse } from '../interfaces/response';
import type { signupData } from '../interfaces/user';
import { signupUser } from '../api/userAuth';
import { Link, useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
   const [formData, setFormData] = useState<signupData>({
      username: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
   });
   const [error, setError] = useState<string>('');
   const navigate = useNavigate()

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
   };

   const validateForm = async (e: FormEvent) => {
      e.preventDefault();
      const { username, email, phone, password, confirmPassword } = formData;

      if (!username || !email || !phone || !password || !confirmPassword) {
         setError('All fields are required.');
         return;
      }
      if (!/^[a-zA-Z\s]+$/.test(username)) {
         setError('Name should only contain letters and spaces.');
         return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
         setError('Invalid email format.');
         return;
      }
      if (!/^\d{10}$/.test(phone)) {
         setError('Phone number must be 10 digits.');
         return;
      }
      if (password.length < 6) {
         setError('Password must be at least 6 characters long.');
         return;
      }
      if (password !== confirmPassword) {
         setError('Passwords do not match.');
         return;
      }

      setError('');
      const response: commonResponse = await signupUser(formData)
      if (response.success) {
         toast.success(response.message)
         navigate('/verifyotp', { state: { email: formData.email } })
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
                  src={eventBg}
                  alt="Event Management"
                  className="object-cover w-full h-full"
               />
            </div>
            {/* Right Side: Form */}
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
               <h1 className="text-4xl font-bold text-center text-indigo-600">Eventify</h1>
               <h2 className="text-2xl font-semibold text-center text-gray-800 mt-2">Create Your Account</h2>
               <p className="text-center text-gray-600 mb-6">Join us to plan unforgettable events!</p>

               {error && <p className="text-red-500 text-center mb-4">{error}</p>}

               <form onSubmit={validateForm} className="space-y-4">
                  <Input handle={handleChange} id='username' labelname='Full Name' type='text' value={formData.username} placeholder="Enter your full name" />
                  <Input type="email" id="email" value={formData.email} handle={handleChange} labelname="Email Address" placeholder="Enter your email" />
                  <Input type="tel" id="phone" value={formData.phone} handle={handleChange} labelname="Phone Number" placeholder="Enter your phone number" />
                  <Input type="password" id="password" value={formData.password} handle={handleChange} labelname="Password" placeholder="Create a password" />
                  <Input type="password" id="confirmPassword" value={formData.confirmPassword} handle={handleChange} labelname="Confirm Password" placeholder="Confirm your password" />
                  <UserSubmitButton buttonValue='Sign Up' />
               </form>
               <p className="text-center text-gray-600 mt-4">
                  Already have an account?{' '}
                  <Link to="/login" className="text-indigo-600 hover:underline">Log in</Link>
               </p>
            </div>
         </div>
      </div>
   );
};

export default Signup;