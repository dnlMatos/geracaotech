import Header from "../compoments/Header/Header";
import Footer from "../compoments/Footer/Footer";
import Galery from "../compoments/Galery/Galery";
import ProductSection from "../compoments/ProductSection/ProductSection";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <Galery />
      <ProductSection />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
