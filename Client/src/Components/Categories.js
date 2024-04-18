import React from 'react';
import { categories } from '../Pages/dummyData';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import '../Styles/Categories.css';

const Categories = () => {
  const navigate = useNavigate();

  return (
    <section className="categories d-flex flex-column align-items-center mb-5">
      <h1 className="mb-5 text-black fw-bolder">
        <span>Top</span> categories
      </h1>
      <div className="row d-flex justify-content-center align-items-center gap-3 g-0 flex-wrap">
        {categories.map((category, index) => (
          <div
            className="col"
            key={index}
            onClick={() => (category.path ? navigate(category.path) : toast('Coming soon...'))}
          >
            <img src={category.imageUrl} alt={category.name} />
            <p>{category.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
