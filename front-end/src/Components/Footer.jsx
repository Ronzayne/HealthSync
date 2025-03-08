import React from "react";
import appointment_doc from "../assets/appointment-doc-img.png";
import arrow from "../assets/arrow_icon.png";
const Footer = () => {
  return (
    <div className=" flex flex-col md:flex-row flex-wrap rounded-lg px-6 md:px-10 lg:px-20 bg-radial from-primary to-secondprimary relative ">
      {/* left side */}
      <div className="md:w-2/3 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[-4vw]  md:mb-[-30px]">
        <p
          className="text-white leading-tight md:leading-tight 
        lg:leading-tight text-2xl sm:text-2xl md:text-4xl lg:text-3xl"
        >
          Get in touch with 50+
        </p>
        <p className="text-white leading-tight md:leading-tight lg:leading-tight text-3xl md:text-4xl lg:text-3xl font-bold">
          Experienced &
        </p>
        <p className="text-white leading-tight md:leading-tight lg:leading-tight text-3xl md:text-4xl lg:text-3xl font-bold">
          Trusted Doctors
        </p>
        <a
          className="flex items-center gap-2 bg-white px-5 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"
          href=""
        >
          Create an account now
          <img className="w-3" src={arrow} alt="" />
        </a>
      </div>

      {/* right side */}
      <div className="md:w-1/3 relative">
        <img
          className="w-full md:absolute bottom-0 h-auto rounded-lg"
          src={appointment_doc}
          alt=""
        />
      </div>
    </div>
  );
};

export default Footer;
