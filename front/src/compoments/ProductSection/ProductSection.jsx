import React from "react";
import collection1 from "../../assets/images/collection-1.png";
import collection2 from "../../assets/images/collection-2.png";
import collection3 from "../../assets/images/collection-3.png";

const images = [collection1, collection2, collection3];

const ProductSection = () => {
  return (
    <div className="w-full">
      <section className="container mx-auto my-10">
        <p className="font-bold mb-5">Coleções em destaque</p>
        <div className="flex gap-3 justify-between">
          {images.map((image, index) => {
            return (
              <div key={index} className="index rounded relative">
                <p
                  className="px-3 py-1 rounded-full absolute text-xs top-4 left-5 font-bold"
                  style={{ background: "#e6ff86" }}
                >
                  30% OFF
                </p>
                <img src={image} alt="image" className="rounded" />
                <button
                  className="cursor-pointer bg-[var(--color-white)] rounded px-5 py-2 font-semibold transition button absolute top-45 left-7"
                  style={{ color: "var(--color-primary)" }}
                >
                  Comprar
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default ProductSection;
