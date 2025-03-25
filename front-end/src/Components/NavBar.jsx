import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import profile_pic from "../assets/profile_pic.png";
import drop_down_icon from "../assets/dropdown_icon.png";
import crossIcon from "../assets/crossIcon.png";
import menuBar from "../assets/menubar.png";
import { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
const NavBar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);

  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img
        onClick={() => navigate("/")}
        className="w-35 cursor-pointer lg:w-44"
        src={logo}
        alt="logo"
      />

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
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              className="w-8 rounded-full"
              src={userData.image}
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
                  onClick={logout}
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
              className=" text-white border-1 px-4  py-2 rounded-full bg-primary cursor-pointer hidden md:inline-flex"
            >
              Create account
            </button>
          </>
        )}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={menuBar}
          alt=""
        />
        {/* mobile menu */}
        <div
          className={`${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img className="w-36" src={logo} alt="" />
            <img
              className="w-4 onClick={()=>setShowMenu(false)}"
              onClick={() => setShowMenu(false)}
              src={crossIcon}
              alt=""
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink onClick={() => setShowMenu(false)} to="/">
              <p className="px-4 py-2 rounded inline-block">Home</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/doctors">
              <p className="px-4 py-2 rounded inline-block">Doctors</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/my-appointments">
              <p className="px-4 py-2 rounded inline-block">Appointments</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/pharmacies">
              <p className="px-4 py-2 rounded inline-block">Pharmacies</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about">
              <p className="px-4 py-2 rounded inline-block">About</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact">
              <p className="px-4 py-2 rounded inline-block">Contact</p>
            </NavLink>
          </ul>
        </div>

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
