import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  const [relDocs, setRelDocs] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      //filters all doctors with the same speciality except the current doctor being displayed

      setRelDocs(doctorsData);
    }
  }, [doctors, speciality, docId]);

  console.log(relDocs);
  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Related Doctors</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Here is a list of related doctors
      </p>
      <div className="w-full grid grid-auto-cols gap-4 gap-y-6">
        {relDocs.slice(0, 4).map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appointments/${item._id}`);
              scrollTo(0, 0);
            }}
            className="border border-primary rounded-xl  overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            key={index}
          >
            <img
              className="bg-primary bg-cover bg-center w-full"
              src={item.image}
              alt=""
            />
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-center text-primary">
                <p className="w-2 h-2 bg-primary rounded-full "></p>
                <p className="">Available</p>
              </div>
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>
              <p className=" text-gray-600 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedDoctors;
