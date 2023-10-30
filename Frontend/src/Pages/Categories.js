import React from "react";
import "../Styles/Categories.css";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();
  return (
    <section className="categories d-flex flex-column align-items-center">
      <h1 className="mb-5 text-black fw-bolder">
        <span>Top</span> categories
      </h1>
      <div className="row d-flex justify-content-center align-items-center gap-3 g-0 flex-wrap">
        <div className="col" onClick={() => navigate("/cat-food")}>
          <img
            src="https://codewithsadee.github.io/kitter/assets/images/category-1.jpg"
            alt="dfg"
          />
          <p>Cat Food</p>
        </div>
        <div className="col">
          <img
            src="https://codewithsadee.github.io/kitter/assets/images/category-2.jpg"
            alt="dfg"
          />
          <p>Cat Toys</p>
        </div>
        <div className="col" onClick={() => navigate("/dog-food")}>
          <img
            src="https://codewithsadee.github.io/kitter/assets/images/category-3.jpg"
            alt="dfg"
          />
          <p>Dog Food</p>
        </div>
        <div className="col">
          <img
            src="https://codewithsadee.github.io/kitter/assets/images/category-4.jpg"
            alt="dfg"
          />
          <p>Dog Toys</p>
        </div>
      </div>
    </section>
  );
};

export default Categories;
