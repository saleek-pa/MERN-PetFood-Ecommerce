import React from "react";
import "../Styles/Services.css"

const Services = () => {
  return (
    <div>
      <section className="services d-flex flex-column align-items-center">
        <img
          src="https://codewithsadee.github.io/kitter/assets/images/service-image.png"
          alt=""
        />
        <h1 className="mt-2 mb-5 text-black text-center fw-bolder">
          <span>What your pet needs,</span> when they need it.
        </h1>
        <div className="d-flex justify-content-center align-items-center flex-wrap mt-3 text-black gap-3">
          <div className="services-list d-flex flex-column justify-content-center align-items-center text-center">
            <img
              src="https://codewithsadee.github.io/kitter/assets/images/service-icon-1.png"
              alt=""
            />
            <h2>Free Same-Day Delivery</h2>
            <p>
              Order by 2pm local time to get free delivery on orders $35+ today.
            </p>
          </div>
          <div className="services-list d-flex flex-column justify-content-center align-items-center text-center">
            <img
              src="https://codewithsadee.github.io/kitter/assets/images/service-icon-2.png"
              alt=""
            />
            <h2>30 Day Return</h2>
            <p>35% off your first order plus 5% off all future orders.</p>
          </div>
          <div className="services-list d-flex flex-column justify-content-center align-items-center text-center">
            <img
              src="https://codewithsadee.github.io/kitter/assets/images/service-icon-3.png"
              alt=""
            />
            <h2>Security payment</h2>
            <p>
              25% off your online order of $50+. Available at most locations.
            </p>
          </div>
          <div className="services-list d-flex flex-column justify-content-center align-items-center text-center">
            <img
              src="https://codewithsadee.github.io/kitter/assets/images/service-icon-4.png"
              alt=""
            />
            <h2>24/7 Support</h2>
            <p>Shop online to get orders over $35 shipped fast and free.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
