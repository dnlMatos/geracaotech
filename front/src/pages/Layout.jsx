import Header from "../compoments/Header/Header";
import Footer from "../compoments/Footer/Footer";
import Galery from "../compoments/Galery/Galery";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <Galery />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
