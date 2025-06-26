import React from "react";
import collection1 from "../../assets/images/collection-1.png";
import collection2 from "../../assets/images/collection-2.png";
import collection3 from "../../assets/images/collection-3.png";

const images = [collection1, collection2, collection3];

const ProductSection = () => {
  return (
    <div className="w-full px-5 md:px-0">
      <section className="container mx-auto my-10">
        <p className="font-bold mb-5 text-lg w-full">Coleções em destaque</p>
        <div className="flex flex-col md:flex-row w-full md:w-auto gap-3 justify-between">
          {images.map((image, index) => {
            return (
              <div
                key={index}
                className="index rounded relative h-80 md:flex md:w-full "
              >
                <div className="absolute h-full w-full mb-10 md:h-auto md:mb-0">
                  <p
                    className="rounded-full py-1 px-2 w-25 text-center absolute mt-10 ml-10 md:ml-4 md:mt-2 md:text-sm md:w-20
                    lg:ml-4 lg:mt-5 lg:text-sm lg:w-20 2xl:ml-5"
                    style={{ background: "#e6ff86" }}
                  >
                    30% OFF
                  </p>
                  <img
                    src={image}
                    alt="image"
                    className="rounded w-full h-full"
                  />
                  <button
                    className="absolute top-60 ml-10 px-5 py-2 rounded cursor-pointer md:ml-4 md:text-sm md:mt-0 
                    md:top-27 lg:top-37 xl:top-47 2xl:top-57 2xl:ml-5"
                    style={{
                      color: "var(--color-primary)",
                      background: "white",
                    }}
                  >
                    Comprar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default ProductSection;
