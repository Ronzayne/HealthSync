import React, { useContext } from "react";
import logo from "../assets/dashboardlogo.png";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const { adminToken, setAdminToken } = useContext(AdminContext);

  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    adminToken && setAdminToken("");
    adminToken && localStorage.removeItem("adminToken");
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b border-gray-300 bg-white">
      <div className="flex items-center gap-3 text-xs">
        <img className="sm:40 w-35 cursor-pointer" src={logo} alt="" />
        <p className="border rounded-full px-2.5 py-0.5 border-gray-300 text-gray-400">
          {adminToken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        onClick={logout}
        className="bg-primary text-white text-sm px-10 py-2 rounded-full"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
