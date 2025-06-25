import React, { useState } from "react";
import "./index.css";
import Logo from "../../assets/Logo.png";
import { Search } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { Menu } from "lucide-react";
import { X } from "lucide-react";
import Divider from "../Divider/Divider";

const Header = () => {
  const [isMobile, setIsMobile] = useState();
  const [showInput, setShowInput] = useState(false);
  const [inputOne, setInputOne] = useState("");
  const [inputTwo, setInputTwo] = useState("");

  const currentPath = window.location.pathname;

  const fadeInput = () => {
    if (window.innerWidth <= 768) {
      setShowInput(!showInput);
    } else {
      handleOnChangeOne({ target: { value: inputOne } });
    }
  };

  const handleOnChangeOne = (e) => {
    setInputOne(e.target.value);
  };

  const handleOnChangeTwo = (e) => {
    setInputTwo(e.target.value);
  };

  return (
    <header className="w-full bg-white">
      <div className=" flex items-center py-5 gap-5 container mx-auto justify-between">
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
            value={inputOne}
            name="inputOne"
            onChange={handleOnChangeOne}
          />
          {showInput ? (
            <X
              size={24}
              className="cursor-pointer"
              onClick={fadeInput}
              style={{ color: "var(--color-primary)" }}
            />
          ) : (
            <Search
              className="md:absolute md:right-2 lg:right-4 cursor-pointer"
              style={{ color: "var(--color-primary)" }}
              onClick={fadeInput}
            />
          )}
        </div>
        <a href="" className="underline min-w-24 hidden md:block">
          Cadastre-se
        </a>
        <button className="hidden md:block cursor-pointer bg-[var(--color-primary)] text-white rounded px-5 py-2 font-semibold hover:bg-pink-700 transition button">
          Entrar
        </button>
        <ShoppingCart
          style={{
            color: "var(--color-primary)",
          }}
          className="cursor-pointer block"
          size={24}
        />
      </div>

      {/*Second input search */}
      {showInput && (
        <div className="container w-full py-2 mx-auto relative  bg-white">
          <input
            type="text"
            className="rounded h-10 px-2 w-full mb-6"
            style={{ backgroundColor: "var(--color-light-gray-3)" }}
            placeholder="Pesquisar produto..."
            value={inputTwo || ""}
            name="inputTwo"
            onChange={handleOnChangeTwo}
          />
          <Search
            className="cursor-pointer absolute right-3 top-4"
            style={{ color: "var(--color-dark-gray-3)" }}
            onClick={handleOnChangeTwo}
          />
        </div>
      )}

      {/*Desktop menu */}
      <nav className="hidden md:flex pb-[15px] container mx-auto">
        <ul className="flex gap-3">
          <ul className="flex gap-3 ">
            <li>
              <a
                href="/home"
                className={`w-full block rounded${
                  currentPath === "/home" ? " active" : ""
                }`}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/products"
                className={`w-full block rounded${
                  currentPath === "/products" ? " active" : ""
                }`}
              >
                Produtos
              </a>
            </li>
            <li>
              <a
                href="/categories"
                className={`w-full block rounded${
                  currentPath === "/categories" ? " active" : ""
                }`}
              >
                Categorias
              </a>
            </li>
            <li>
              <a
                href="/delivery"
                className={`w-full block rounded${
                  currentPath === "/delivery" ? " active" : ""
                }`}
              >
                Meus Pedidos
              </a>
            </li>
          </ul>
        </ul>
      </nav>

      {/*Mobile menu*/}
      {isMobile && (
        <div className="md:hidden container px-8 bg-white max-w-1/2 absolute">
          <nav className="flex gap-3 flex-col mb-5">
            <p className="font-bold">Páginas</p>
            <ul className="flex gap-3 flex-col">
              <li>
                <a
                  href="/home"
                  className={`w-full block rounded${
                    currentPath === "/home" ? " active" : ""
                  }`}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  className={`w-full block rounded${
                    currentPath === "/products" ? " active" : ""
                  }`}
                >
                  Produtos
                </a>
              </li>
              <li>
                <a
                  href="/categories"
                  className={`w-full block rounded${
                    currentPath === "/categories" ? " active" : ""
                  }`}
                >
                  Categorias
                </a>
              </li>
              <li>
                <a
                  href="/delivery"
                  className={`w-full block rounded${
                    currentPath === "/delivery" ? " active" : ""
                  }`}
                >
                  Meus Pedidos
                </a>
              </li>
            </ul>
            <Divider />
            <div className="flex justify-between items-center">
              <button className="cursor-pointer bg-[var(--color-primary)] text-white rounded px-5 py-2 font-semibold hover:bg-pink-700 transition button">
                Entrar
              </button>
              <a href="" className="underline min-w-24 ">
                Cadastre-se
              </a>
            </div>
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
