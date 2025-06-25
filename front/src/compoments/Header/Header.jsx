import React, { useState } from "react";
import Logo from "../../assets/Logo.png";
import { Search } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { Menu } from "lucide-react";
import { X } from "lucide-react";

const Header = () => {
  const [isMobile, setIsMobile] = useState();
  const [showInput, setShowInput] = useState(false);
  const [data, setData] = useState("");

  const fadeInput = () => {
    if (window.innerWidth <= 768) {
      setShowInput(!showInput);
    } else {
      handleOnChange({ target: { value: data } });
    }
  };

  const handleOnChange = (e) => {
    setData(e.target.value);
    console.log(e.target.value);
  };

  return (
    <header className="w-full bg-white">
      <div className=" flex items-center p-5 gap-5 container mx-auto justify-between">
        {/*Interactive mobile button */}
        <div className="md:hidden ">
          <button onClick={() => setIsMobile(!isMobile)}>
            {isMobile ? (
              <X size={24} className="cursor-pointer" />
            ) : (
              <Menu size={24} className="cursor-pointer" />
            )}
          </button>
        </div>

        <img src={Logo} alt="digital store" className="w-3xs lg:w-2xs " />
        <div className="flex justify-center items-center md:relative">
          <input
            type="text"
            className="rounded h-10 px-2 hidden md:block lg:w-xs xl:w-xl"
            style={{ backgroundColor: "var(--color-light-gray-3)" }}
            placeholder="Pesquisar produto..."
            value={data}
            name="search"
            onChange={handleOnChange}
          />
          <Search
            className="md:absolute md:right-2 lg:right-4 cursor-pointer"
            style={{ color: "var(--color-dark-gray-3)" }}
            onClick={fadeInput}
          />
        </div>
        <a href="" className="underline min-w-24 hidden md:block">
          Cadastre-se
        </a>
        <button className="hidden md:block cursor-pointer bg-[var(--color-primary)] text-white rounded p-2 font-semibold hover:bg-pink-700 transition button">
          Entrar
        </button>
        <ShoppingCart
          style={{
            color: "var(--color-primary)",
          }}
          className="cursor-pointer"
          size={24}
        />
      </div>

      {/*Second input search */}
      {showInput && (
        <div className="container w-full px-5 mx-auto relative  bg-white">
          <input
            type="text"
            className="rounded h-10 px-2 w-full mb-6"
            style={{ backgroundColor: "var(--color-light-gray-3)" }}
            placeholder="Pesquisar produto..."
            value={data}
            name="search"
            onChange={handleOnChange}
          />
          <Search
            className="cursor-pointer absolute right-10 top-2"
            style={{ color: "var(--color-dark-gray-3)" }}
            onClick={handleOnChange}
          />
        </div>
      )}

      {/*Desktop menu */}
      <nav className="hidden md:flex container mx-auto px-5">
        <ul className="flex gap-3">
          <li>Home</li>
          <li>Produtos</li>
          <li>Categorias</li>
          <li>Meus Pedidos</li>
        </ul>
      </nav>

      {/*Interactive mobile button */}
      {/* <div className="md:hidden container mx-auto px-5">
        <button onClick={() => setIsMobile(!isMobile)}>
          {isMobile ? (
            <X size={24} className="cursor-pointer" />
          ) : (
            <Menu size={24} className="cursor-pointer" />
          )}
        </button>
      </div> */}

      {/*Mobile menu*/}
      {isMobile && (
        <div className="md:hidden container px-10 bg-white max-w-1/2 absolute">
          <nav className="flex gap-3 flex-col">
            <p className="font-bold">Páginas</p>
            <ul className="flex gap-3 flex-col">
              <li>Home</li>
              <li>Produtos</li>
              <li>Categorias</li>
              <li>Meus Pedidos</li>
            </ul>
          </nav>
          {/* <button onClick={() => setIsMobile(false)}>
            <Menu size={24} />
          </button> */}
        </div>
      )}
    </header>
  );
};

export default Header;
