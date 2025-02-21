import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
const NavBar = () => {
  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img className="w-44 cursor-pointer" src={logo} alt="logo" />
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
      <div>
        <NavLink to="create-account">
          <button className=" text-white border-1 p-2 rounded-2xl bg-primary ">
            Create account
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
