import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Healthquery from "../Components/Healthquery";
import SpecialityMenu from "../Components/SpecialityMenu";

const Home = () => {
  return (
    <div>
      <Header />
      <SpecialityMenu />
      <Healthquery />
      <Footer />
    </div>
  );
};

export default Home;
