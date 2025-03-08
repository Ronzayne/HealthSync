import React from "react";
import loop from "../assets/Looper-3.png";
import arrow_icon from "../assets/arrow_icon.png";
import header_img from "../assets/doc-header-img.png";
const Header = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${loop}), radial-gradient(circle,  #18AF6B,#086E40)`,
        backgroundSize: "130%",
      }}
      className="flex flex-col md:flex-row flex-wrap rounded-lg px-6 md:px-10 lg:px-20 relative bg-cover bg-center bg-no-repeat"
    >
      {/* left side */}
      <div className="md:w-1/3 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
        <p className="text-white leading-tight md:leading-tight lg:leading-tight text-3xl md:text-4xl lg:text-5xl">
          Welcome to
        </p>
        <p className="text-white leading-tight md:leading-tight lg:leading-tight text-3xl md:text-4xl lg:text-5xl font-bold">
          HealthSync
        </p>
        <p className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
          Chance to interact and book appointments <br />
          with some of the best doctors
        </p>
        <a
          className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"
          href="speciality"
        >
          Book appointment <img className="w-3" src={arrow_icon} alt="" />
        </a>
      </div>

      {/* right side */}
      <div className="md:w-2/3 relative">
        <img
          className="w-full md:absolute bottom-0 h-auto rounded-lg"
          src={header_img}
          alt=""
        />
      </div>
    </div>
  );
};

export default Header;
