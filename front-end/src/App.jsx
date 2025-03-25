import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Doctors from "./Pages/Doctors";
import Login from "./Pages/Login";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import MyProfile from "./Pages/MyProfile";
import MyAppointment from "./Pages/MyAppointment";
import Pharmacies from "./Pages/Pharmacies";
import NavBar from "./Components/NavBar";

import HealthChat from "./Components/HealthChat";
import Appointments from "./Pages/Appointments";
import { ToastContainer, toast } from "react-toastify";
import Message from "./Components/Message";

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer />
      <NavBar /> {/*Visible in all the pages*/}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appointments" element={<MyAppointment />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/pharmacies" element={<Pharmacies />} />
        <Route path="/appointments/:docId" element={<Appointments />} />
        <Route path="/healthchat" element={<HealthChat />} />
        <Route path="/message" element={<Message />} />
        <Route path="/message/:docId" element={<Message />} />
      </Routes>
    </div>
  );
};

export default App;
