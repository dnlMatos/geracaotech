import Header from "../compoments/Header/Header";
import Footer from "../compoments/Footer/Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
