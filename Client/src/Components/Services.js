import React from 'react';
import { services } from '../Pages/dummyData';

const Services = () => {
  return (
    <section className="services d-flex flex-column align-items-center">
      <img
        src="https://res.cloudinary.com/dmzqckfj4/image/upload/v1706504553/home%20page/bqajzjmxxfnmqzsokwxi.png"
        alt=""
      />
      <h1 className="mt-2 mb-5 text-black text-center fw-bolder">
        <span>What your pet needs,</span> when they need it.
      </h1>
      <div className="d-flex justify-content-center align-items-center flex-wrap mt-3 text-black gap-3">
        {services.map((service, index) => (
          <div
            key={index}
            className="services-list d-flex flex-column justify-content-center align-items-center text-center"
          >
            <img src={service.imageUrl} alt="" />
            <h2>{service.title}</h2>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
