import React, { useState } from "react";
import logo from "../assets/logo.png";
import signUpFrame from "../assets/signUpFrame.png";
const Login = () => {
  const [state, setState] = useState("Sign Up");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault(); //when the form is submitted, it won't reload the webpage
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="grid lg:grid-cols-2 gap-x-4 w-full max-w-4xl">
        {/* left side */}

        <img
          className="hidden min- lg:block w-full h-auto "
          src={signUpFrame}
          alt=""
        />

        {/* rightside */}

        <form className="min-h-[80vh] w-full max-w-sm mx-auto flex flex-col items-center">
          <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-gray-50 rounded-xl text-zinc-600 text-sm shadow-lg">
            <p className=" text-2xl font-semibold text-gray-800 ">
              {state === "Sign Up" ? "Create an Account" : "Login"}
            </p>
            <p className="text-primary">
              {state == "Sign Up" ? (
                <>
                  Fill the form below to create an account with{" "}
                  <strong>HealthSync</strong>
                </>
              ) : (
                <>
                  Welcome back! Fill in the form below to log into{" "}
                  <strong>HealthSync</strong>
                </>
              )}
            </p>
            {state === "Sign Up" && (
              <div className="w-full">
                <p>Full Name</p>
                <input
                  className="border border-zinc-300 rounded w-full p-2 mt-1"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
              </div>
            )}

            <div className="w-full">
              <p>Email</p>
              <input
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div className="w-full">
              <p>Password</p>
              <input
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
            <button className="bg-primary w-full text-white py-2 rounded-md text-base">
              {state === "Sign Up" ? "Sign Up" : "Login"}
            </button>
            {state === "Sign Up" ? (
              <p>
                Already have an account?{" "}
                <span
                  onClick={() => setState("Login")}
                  className="text-primary underline cursor-pointer"
                >
                  Login
                </span>
              </p>
            ) : (
              <p>
                Don't have an account yet?{" "}
                <span
                  onClick={() => setState("Sign Up")}
                  className="text-primary underline cursor-pointer"
                >
                  Sign Up
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
