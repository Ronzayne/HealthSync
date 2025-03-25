import React, { useContext, useState } from "react";
import loginLogo from "../assets/signUpframe.png";
import logo from "../assets/logo.png";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAdminToken, backendUrl } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("adminToken", data.token);
          setAdminToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
      }
    } catch (error) {}
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="grid lg:grid-cols-2 gap-x-4 w-full max-w-4xl">
        <img
          className="hidden min- lg:block w-full h-auto "
          src={loginLogo}
          alt=""
        />
        <form
          onSubmit={onSubmitHandler}
          className="min-h-[80vh] w-full max-w-sm mx-auto flex flex-col items-center"
        >
          <img className=" w-50 sm:w-40 md:w-40" src={logo} alt="" />

          <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-gray-50 rounded-xl text-zinc-600 text-sm shadow-lg">
            <p className="text-2xl font-semibold text-gray-800 m-auto">
              <span className="text-primary">{state}</span> Login
            </p>
            <p className="text-primary items-center m-auto">
              Fill in the form below to log in as{" "}
              <span className="font-semibold">{state}</span>
            </p>
            <div className="w-full">
              <p>Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                type="email"
                required
              />
            </div>
            <div className="w-full">
              <p>Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                type="password"
                required
              />
            </div>
            <button className="bg-primary w-full text-white py-2 rounded-md text-base">
              Login
            </button>
            {state === "Admin" ? (
              <p>
                Doctor Login?{" "}
                <span
                  className="text-primary underline cursor-pointer"
                  onClick={() => setState("Doctor")}
                >
                  Click here
                </span>
              </p>
            ) : (
              <p>
                Admin Login?{" "}
                <span
                  className="text-primary underline cursor-pointer"
                  onClick={() => setState("Admin")}
                >
                  Click here
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
