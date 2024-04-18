import React from 'react';
import { brandImages } from '../Pages/dummyData';

const Brands = () => {
  return (
    <section className="brands mt-5 mb-5 d-flex flex-column align-items-center">
      <h1 className="text-black fw-bolder mt-5">
        <span>Popular</span> Brands
      </h1>
      <div className="d-flex flex-wrap justify-content-center align-items-center mt-4 gap-5">
        {brandImages.map((brandImg, index) => (
          <img key={index} src={brandImg} alt={`${index + 1}`} />
        ))}
      </div>
    </section>
  );
};

export default Brands;
