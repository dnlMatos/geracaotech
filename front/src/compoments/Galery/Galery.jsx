import React from "react";
import Image from "../../assets/images/home-slide-2.jpeg";
import homeSlide1 from "../../assets/images/home-slide-1.jpeg";
import homeSlide2 from "../../assets/images/home-slide-2.jpeg";
import homeSlide3 from "../../assets/images/home-slide-3.jpeg";
import homeSlide4 from "../../assets/images/home-slide-4.jpeg";
import homeSlide5 from "../../assets/images/home-slide-5.jpeg";
import homeSlide6 from "../../assets/images/home-slide-6.jpeg";
import homeSlide7 from "../../assets/images/home-slide-7.jpeg";
import homeSlide8 from "../../assets/images/home-slide-8.jpeg";

const images = [
  homeSlide1,
  homeSlide2,
  homeSlide3,
  homeSlide4,
  homeSlide5,
  homeSlide6,
  homeSlide7,
  homeSlide8,
];

const Galery = () => {
  return (
    <div className="container flex mx-auto my-5">
      <aside className="flex flex-col gap-3">
        <p className="font-bold" style={{ color: "var(--color-warning)" }}>
          Melhores ofertas personalizadas
        </p>
        <h1 className="text-4xl font-bold" style={{ color: "black" }}>
          Queima de estoque Nike
        </h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <button className="success">Ver Ofertas</button>
      </aside>
      <aside>
        <img src={Image} alt="" srcset="" />
      </aside>
    </div>
  );
};

export default Galery;
