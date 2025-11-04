import { Route, Routes } from "react-router-dom"
import Signup from "../pages/Signup"
import VerifyOTP from "../pages/VerifyOtp"
import Login from "../pages/Login"
import Sidebar from "../components/Siderbar"
import Header from "../components/Header"
import Dashboard from "../components/Dashboard"
import AddVolunteer from "../components/AddVolunteer"
import AssignVolunteers from "../components/AssignVolunteer"
import ManageEvent from "../components/ManageEvent"
import EventDetails from "../components/subcomponents/EventDetails"
import Home from "../pages/Home"
import UpdatePassword from "../components/subcomponents/UpdatePassword"
import ProfileUpdate from "../components/subcomponents/ProfileUpdate"
import YourTickets from "../components/subcomponents/YourTicket"
import UserDashboard from "../components/subcomponents/Dashboard"
import Profile from "../components/user/Profile"
import UserEventDetails from "../components/user/EventDetails"
import VolunteerPage from "../pages/Volunteer"
import About from "../pages/About"
import Backloginprotected from "./Protected/BackLoginProtected"
import AdminbackDashprotected from "./Protected/AdminbackDashprotected"
import VolunteerbackDashprotected from "./Protected/VolunteerbackDashprotected"
import UserbackDashprotected from "./Protected/UserbackDahboardProtected"
import UserEvent from "../pages/userEvent"


function UserRoute() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/verifyotp" element={<VerifyOTP />} />
      <Route path="/login" element={<Backloginprotected><Login /></Backloginprotected>} />
      <Route path="/volunteer" element={<VolunteerbackDashprotected><VolunteerPage /></VolunteerbackDashprotected>} />
      <Route
        path="/admin/*"
        element={
          <div className="flex">
            <Sidebar />
            <div className="flex-1 ml-64">
              <Header />
              <div className="mt-16 ">
                <Routes>
                  <Route path="dashboard" element={<AdminbackDashprotected><Dashboard /></AdminbackDashprotected>} />
                  <Route path="add-event" element={<AdminbackDashprotected><ManageEvent /></AdminbackDashprotected>} />
                  <Route path="add-volunteer" element={<AdminbackDashprotected><AddVolunteer /></AdminbackDashprotected>} />
                  <Route path="assign-volunteers" element={<AdminbackDashprotected><AssignVolunteers /></AdminbackDashprotected>} />
                  <Route path="event-details" element={<AdminbackDashprotected><EventDetails /></AdminbackDashprotected>} />
                </Routes>
              </div>
            </div>
          </div>
        }
      />
      <Route
        path="/user/*"
        element={
          <div className="flex min-h-screen">
            <div className="flex-1">
              <Routes>
                <Route path="home" element={<UserbackDashprotected><Home /></UserbackDashprotected>} />
                <Route path="userEvent" element={<UserbackDashprotected><UserEvent /></UserbackDashprotected>} />
                <Route path="about" element={<UserbackDashprotected><About /></UserbackDashprotected>} />
                <Route path="event-details" element={<UserbackDashprotected><UserEventDetails /></UserbackDashprotected>} />
                <Route
                  path="profile/*"
                  element={
                    <div className="flex min-h-screen">
                      <Profile />
                      <div className="flex-1 ml-64">
                        <div className="mt-20 p-6">
                          <Routes>
                            <Route path="dashboard" element={<UserbackDashprotected><UserDashboard /></UserbackDashprotected>} />
                            <Route path="update-password" element={<UserbackDashprotected><UpdatePassword /></UserbackDashprotected>} />
                            <Route path="profile-update" element={<UserbackDashprotected><ProfileUpdate /></UserbackDashprotected>} />
                            <Route path="your-tickets" element={<UserbackDashprotected><YourTickets /></UserbackDashprotected>} />
                          </Routes>
                        </div>
                      </div>
                    </div>
                  }
                />
              </Routes>
            </div>
          </div>
        }
      />
    </Routes>
  )
}

export default UserRoute