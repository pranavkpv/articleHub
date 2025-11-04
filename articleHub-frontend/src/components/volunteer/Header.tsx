import React, { useState } from "react";
import Logout from "../subcomponents/Logout";



const VolunteerHeader: React.FC = () => {
  const [on, setOn] = useState(false)
  const onLogout = ()=>{
    setOn(true)
  }
  return (
    <header className="flex justify-between items-center bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-500 text-white px-8 py-4 shadow-lg">
      <h1 className="text-2xl font-extrabold tracking-wide drop-shadow">Eventify Volunteer Panel</h1>
      <button
        onClick={onLogout}
        className="bg-white text-indigo-600 px-5 py-2 rounded-full font-semibold shadow hover:bg-indigo-100 transition"
      >
        Logout
      </button>
      <Logout addOn={on} setAddOn={setOn} />
    </header>
  )
};


export default VolunteerHeader;
