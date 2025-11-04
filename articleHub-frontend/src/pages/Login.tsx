import React, { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import eventBg from '../assets/event-bg.png'
import type { loginData } from '../interfaces/user';
import { userLogin } from '../api/userAuth';
import { toast } from 'react-toastify';
import type { loginResponse } from '../interfaces/output';




const Login: React.FC = () => {
   const [formData, setFormData] = useState<loginData>({
      email: '',
      password: '',
   });
   const [error, setError] = useState<string>('');
   const navigate = useNavigate()

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
   };

   const validateForm = async (e: FormEvent) => {
      e.preventDefault();
      const { email, password } = formData;

      if (!email || !password) {
         setError('Both email and password are required.');
         return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
         setError('Invalid email format.');
         return;
      }
      if (password.length < 6) {
         setError('Password must be at least 6 characters long.');
         return;
      }
      setError('');
      const response: loginResponse = await userLogin(formData)
      if (response.success) {
         toast.success(response.message)
         localStorage.setItem('token', response.data.token)
         if (response.data.role === 'admin') {
            navigate('/admin/dashboard')
         } else if (response.data.role === 'user') {
            navigate('/user/home')
         } else {
            navigate('/volunteer')
         }
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
               <h2 className="text-2xl font-semibold text-center text-gray-800 mt-2">Log In</h2>
               <p className="text-center text-gray-600 mb-6">Access your account to manage your events! Only participants are eligible to create an account.</p>

               {error && <p className="text-red-500 text-center mb-4">{error}</p>}

               <form onSubmit={validateForm} className="space-y-4">
                  <div>
                     <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                     <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                     />
                  </div>
                  <div>
                     <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                     <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                     />
                  </div>
                  <button
                     type="submit"
                     className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
                  >
                     Log In
                  </button>
               </form>
               <p className="text-center text-gray-600 mt-4">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-indigo-600 hover:underline">
                     Create Account
                  </Link>
               </p>
            </div>
         </div>
      </div>
   );
};

export default Login;