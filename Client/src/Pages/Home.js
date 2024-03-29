import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axios } from '../Utils/Axios';
import ProductList from '../Components/ProductList';
import Button from '../Components/Button';
import toast from 'react-hot-toast';
import '../Styles/Header.css';
import '../Styles/Categories.css';
import '../Styles/Products.css';

const Home = () => {
  const navigate = useNavigate();
  const [topSellingProducts, setTopSellingProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/users/products');
        setTopSellingProducts(response.data.data.slice(0, 8));
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <header className="header">
        <div className="header-info">
          <h2>HIGH QUALITY</h2>
          <h1>PET FOOD</h1>
          <p>Sale up to 40% off today</p>
          <Button color="black" className="header-button" onClick={() => navigate('/products')}>
            Shop Now
          </Button>
        </div>
      </header>

      <section className="categories d-flex flex-column align-items-center mb-5">
        <h1 className="mb-5 text-black fw-bolder">
          <span>Top</span> categories
        </h1>
        <div className="row d-flex justify-content-center align-items-center gap-3 g-0 flex-wrap">
          {categories.map((category, index) => (
            <div className="col" key={index} onClick={() => navigate(category.path)}>
              <img src={category.imageUrl} alt={category.name} />
              <p>{category.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="products d-flex flex-column align-items-center">
        <h1 className="text-black fw-bolder">
          <span>Best</span> Seller
        </h1>
        <ProductList products={topSellingProducts} />
      </section>

      <section className="services d-flex flex-column align-items-center">
        <img src="https://res.cloudinary.com/dmzqckfj4/image/upload/v1706504553/home%20page/bqajzjmxxfnmqzsokwxi.png" alt="" />
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
    </div>
  );
};

export default Home;
