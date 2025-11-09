import React, { useEffect, useState, type FormEvent } from 'react';
import articleBg from '../assets/ArticleHub.png';
import Input from '../reusable/Input';
import UserSubmitButton from '../reusable/UserSubmitButton';
import { toast } from 'react-toastify';
import type { signupData } from '../interfaces/user';
import { signupUser } from '../api/userAuth';
import { Link, useNavigate } from 'react-router-dom';
import type { categoryData } from '../interfaces/category';
import { listCategoryApi } from '../api/category';
// import listCategoryApi from your APIs

const Signup: React.FC = () => {
   const [formData, setFormData] = useState<signupData>({
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      DOB: '',
      preference: []
   });
   const [categories, setCategories] = useState<categoryData[]>([]);
   const [error, setError] = useState<string>('');
   const navigate = useNavigate();

   const fetchCategory = async () => {
      const categoryData = await listCategoryApi();
      if (categoryData.success) {
         setCategories(categoryData.data);
      } else {
         toast.error(categoryData.message);
      }
   };

   useEffect(() => {
      fetchCategory();
   }, []);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   const handleCategoryChange = (categoryId: string) => {
      setFormData((prev) => {
         const alreadySelected = prev.preference.includes(categoryId);
         return {
            ...prev,
            preference: alreadySelected
               ? prev.preference.filter((id) => id !== categoryId)
               : [...prev.preference, categoryId]
         };
      });
   };

   const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
         ...prev,
         DOB: e.target.value
      }));
   };

   const validateForm = async (e: FormEvent) => {
      e.preventDefault();
      const { firstname, lastname, email, phone, password, confirmPassword, preference, DOB } = formData;

      if (!firstname || !lastname || !email || !phone || !password || !confirmPassword || !DOB) {
         setError('All fields are required.');
         return;
      }
      if (!/^[a-zA-Z\s]+$/.test(firstname)) {
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
      if (preference.length === 0) {
         setError('Please select at least one preference.');
         return;
      }

      setError('');
      const response = await signupUser(formData);
      if (response.success) {
         toast.success(response.message);
         navigate('/verifyotp', { state: { email: formData.email } });
      } else {
         toast.error(response.message);
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
               <h2 className="text-2xl font-semibold text-center text-gray-800 mt-2">Create Your Account</h2>
               <p className="text-center text-gray-600 mb-6">Join us to plan unforgettable events!</p>

               {error && <p className="text-red-500 text-center mb-4">{error}</p>}

               <form onSubmit={validateForm} className="space-y-4">
                  <Input handle={handleChange} id="firstname" name="firstname" labelname="First Name" type="text" value={formData.firstname} placeholder="Enter your first name" />
                  <Input handle={handleChange} id="lastname" name="lastname" labelname="Last Name" type="text" value={formData.lastname} placeholder="Enter your last name" />
                  <Input type="email" id="email" name="email" value={formData.email} handle={handleChange} labelname="Email Address" placeholder="Enter your email" />
                  <Input type="tel" id="phone" name="phone" value={formData.phone} handle={handleChange} labelname="Phone Number" placeholder="Enter your phone number" />
                  <Input type="password" id="password" name="password" value={formData.password} handle={handleChange} labelname="Password" placeholder="Create a password" />
                  <Input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} handle={handleChange} labelname="Confirm Password" placeholder="Confirm your password" />

                  {/* DOB Field */}
                  <label htmlFor="DOB" className="block text-gray-700">Date of Birth</label>
                  <input
                     type="date"
                     id="DOB"
                     name="DOB"
                     value={formData.DOB}
                     onChange={handleDateChange}
                     className="w-full border px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:border-indigo-500"
                  />

                  {/* Category Preferences */}
                  <label className="block text-gray-700">Category Preferences</label>
                  <ul className="flex flex-wrap gap-2 mb-2">
                     {categories.map((element: categoryData) => (
                        <li key={element._id} className="flex items-center">
                           <input
                              type="checkbox"
                              id={element._id}
                              checked={formData.preference.includes(element._id)}
                              onChange={() => handleCategoryChange(element._id)}
                              className="mr-2"
                           />
                           <label htmlFor={element._id}>{element.name}</label>
                        </li>
                     ))}
                  </ul>

                  <UserSubmitButton buttonValue="Sign Up" />
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
