import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import profile_pic from "../assets/profile_pic.png";
import drop_down_icon from "../assets/dropdown_icon.png";
import { useState } from "react";
const NavBar = () => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true); // having token means logged in else logged out

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img className="w-35 cursor-pointer lg:w-44" src={logo} alt="logo" />
      <ul className="hidden md:flex items-start gap-5 font-medium">
        {" "}
        {/*hidden in phone view */}
        <NavLink to="/">
          <li className="py-1">Home</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">Doctors</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/my-appointments">
          <li className="py-1">Appointments</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/pharmacies">
          <li className="py-1">Pharmacies</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">About</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="contact">
          <li className="py-1">Contact</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>
      <div className="flex gap-1.5">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              className="w-8 rounded-full"
              src={profile_pic}
              alt="Profile pic"
            />

            <img className="w-2.5" src={drop_down_icon} alt="dropdownicon" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:bg-gray-300 cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => setToken(false)}
                  className="hover:bg-gray-300 cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="border-1 px-4 py-2 rounded-full cursor-pointer hidden lg:inline-flex"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/create-account")}
              className=" text-white border-1 px-4  py-2 rounded-full bg-primary cursor-pointer hidden md:inline-flex"
            >
              Create account
            </button>
          </>
        )}

        {/* <div className="flex items-center">
          <button
            onClick={() => navigate("/create-account")}
            className=" text-white border-1 px-4  py-2 rounded-full bg-primary cursor-pointer"
          >
            Create account
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default NavBar;
