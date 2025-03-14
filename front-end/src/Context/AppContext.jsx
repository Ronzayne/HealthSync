import { createContext } from "react";
import { doctors } from "../assets/doctors";
export const AppContext = createContext();

const AppCountextProvider = (props) => {
  // whatever is added in the value object can be accessed in any component
  const value = {
    doctors,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppCountextProvider;
