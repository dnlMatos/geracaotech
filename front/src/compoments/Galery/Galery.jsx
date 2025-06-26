import React from "react";
import Slider from "react-slick";
import "./index.css";

// Importa as imagens
import homeSlide1 from "../../assets/images/home-slide-1.jpeg";
import homeSlide2 from "../../assets/images/home-slide-2.jpeg";
import homeSlide3 from "../../assets/images/home-slide-3.jpeg";
import homeSlide4 from "../../assets/images/home-slide-4.jpeg";
import homeSlide5 from "../../assets/images/home-slide-5.jpeg";
import homeSlide6 from "../../assets/images/home-slide-6.jpeg";
import homeSlide7 from "../../assets/images/home-slide-7.jpeg";
import homeSlide8 from "../../assets/images/home-slide-8.jpeg";
import flame from "../../assets/images/flame.png";

// Importa os estilos do slick-carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img
            src={images[i]}
            alt={`Thumbnail ${i + 1}`}
            style={{ width: "100%", height: "50px", objectFit: "cover" }}
          />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    fade: true,
    waitForAnimate: false,
    pauseOnHover: true,
    arrows: false,
  };

  return (
    <div
      className="w-full py-15"
      style={{ background: "var(--color-light-gray-3)" }}
    >
      <div className="slider-container mx-auto container md:relative flex flex-col justify-center">
        <Slider {...settings}>
          {images.map((img, index) => (
            <div key={index} className="w-full 2xl:h-162">
              <img src={img} alt={`Slide ${index + 1}`} className="w-full" />
            </div>
          ))}
        </Slider>
        <aside
          className="mt-20 flex items-center flex-col gap-5 md:absolute md:mt-0 md:px-10 md:items-start"
          style={{ zIndex: "9" }}
        >
          <p className="text-lg font-bold text-[var(--color-primary)] sm:text-[var(--color-warning)]">
            Melhores ofertas personalizadas
          </p>
          <div className="flex gap-2 items-center">
            <h1
              className="font-bold text-5xl flex items-end"
              style={{ color: "black" }}
            >
              Queima de <br /> estoque Nike
              <img src={flame} alt="" className="imgFlame" />
            </h1>
          </div>
          <p style={{ color: "black" }}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <button
            className="w-46 cursor-pointer bg-[var(--color-primary)] text-white rounded px-5 py-2 
          font-semibold hover:bg-pink-700 transition"
          >
            Ver Ofertas
          </button>
        </aside>
      </div>
    </div>
  );
};

export default Galery;
