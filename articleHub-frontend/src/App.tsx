import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import UserRoute from "./router/Router";




function App() {
  return (
    <>
        <BrowserRouter>
            <Routes>
              <Route path="/*" element={<UserRoute />} />
            </Routes>
          <ToastContainer />
        </BrowserRouter>
    </>
  );
}

export default App;