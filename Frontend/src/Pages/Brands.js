import React from "react";

const Brands = () => {
  return (
    <div>
      <section className="brands mt-5 mb-5 d-flex flex-column align-items-center">
        <h1 className="text-black fw-bolder mt-5">
          <span>Popular</span> Brands
        </h1>
        <div className="d-flex flex-wrap justify-content-center align-items-center mt-4 gap-5">
          <img
            src="https://codewithsadee.github.io/kitter/assets/images/brand-1.jpg"
            alt=""
          />
          <img
            src="https://codewithsadee.github.io/kitter/assets/images/brand-2.jpg"
            alt=""
          />
          <img
            src="https://codewithsadee.github.io/kitter/assets/images/brand-3.jpg"
            alt=""
          />
          <img
            src="https://codewithsadee.github.io/kitter/assets/images/brand-4.jpg"
            alt=""
          />
          <img
            src="https://codewithsadee.github.io/kitter/assets/images/brand-5.jpg"
            alt=""
          />
        </div>
      </section>
    </div>
  );
};

export default Brands;
