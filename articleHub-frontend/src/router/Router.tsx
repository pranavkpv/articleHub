import { Route, Routes } from "react-router-dom"
import Signup from "../pages/Signup"
import VerifyOTP from "../pages/VerifyOtp"
import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"
import ArticlesContainer from "../pages/ArticleContainer"
import SettingPage from "../pages/SettingPage"





function UserRoute() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/verifyotp" element={<VerifyOTP />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/article" element={<ArticlesContainer />} />
      <Route path="/setting" element={<SettingPage />} />
    </Routes>
  )
}

export default UserRoute