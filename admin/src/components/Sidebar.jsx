import React, { useContext, useLayoutEffect } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import dashboard from "../assets/dashboard.png";
import appointments from "../assets/appointments.png";
import addIcon from "../assets/addIcon.png";
import listIcon from "../assets/listIcon.png";

const Sidebar = () => {
  const { adminToken } = useContext(AdminContext);
  return (
    <div className="min-h-screen bg-white border-r border-gray-300">
      {adminToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-green-300 border-r-4 border-primary" : ""
              }`
            }
            to={"/admin-dashboard"}
          >
            <img className="w-5" src={dashboard} alt="" />
            <p>Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-green-300 border-r-4 border-primary" : ""
              }`
            }
            to={"/all-appointments"}
          >
            <img className="w-5" src={appointments} alt="" />
            <p>Appointments</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-green-300 border-r-4 border-primary" : ""
              }`
            }
            to={"/add-doctor"}
          >
            <img className="w-5" src={addIcon} alt="" />
            <p>Add Doctor</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-green-300 border-r-4 border-primary" : ""
              }`
            }
            to={"/doctor-list"}
          >
            <img className="w-5" src={listIcon} alt="" />
            <p>Doctors List</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
