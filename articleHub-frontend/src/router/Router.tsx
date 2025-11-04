import { Route, Routes } from "react-router-dom"
import Signup from "../pages/Signup"
import VerifyOTP from "../pages/VerifyOtp"
import Login from "../pages/Login"
import About from "../pages/About"



function UserRoute() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/verifyotp" element={<VerifyOTP />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin/*"
        element={
          <div className="flex">

            <div className="flex-1 ml-64">

              <div className="mt-16 ">
                <Routes>


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
                <Route path="about" element={<About />} />
                <Route
                  path="profile/*"
                  element={
                    <div className="flex min-h-screen">
                      <div className="flex-1 ml-64">
                        <div className="mt-20 p-6">
                          <Routes>
                            
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