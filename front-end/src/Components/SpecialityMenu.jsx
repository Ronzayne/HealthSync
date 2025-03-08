import { specialityData } from "../assets/specialityData";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  const specialityElement = specialityData.map((items, index) => (
    <Link
      onClick={() => scrollTo(0, 0)}
      className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
      key={index}
      to={`/doctors/${items.speciality}`}
    >
      <img className="w-16 sm:w-24 mb-2" src={items.image} alt="" />
      <p>{items.speciality}</p>
    </Link>
  ));
  return (
    <div
      className="flex flex-col items-center gap-4 py-16 text-gray-800"
      id="speciality"
    >
      <h1 className="text-3xl font-medium">Experts at your service</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Browse through a variety of expert Doctors, all at your service.
      </p>
      <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-scroll">
        {specialityElement}
      </div>
    </div>
  );
};

export default SpecialityMenu;
