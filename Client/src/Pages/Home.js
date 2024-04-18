import React, { useContext } from 'react';
import { PetContext } from '../Context/Context';
import ProductList from '../Components/ProductList';
import Header from '../Components/Header';
import Categories from '../Components/Categories';
import Services from '../Components/Services';
import Brands from '../Components/Brands';
import '../Styles/Products.css';

const Home = () => {
  const { products } = useContext(PetContext);

  return (
    <div>
      <Header />
      <Categories />

      <section className="products d-flex flex-column align-items-center">
        <h1 className="text-black fw-bolder">
          <span>Best</span> Seller
        </h1>
        <ProductList products={products.slice(0, 8)} />
      </section>

      <Services />
      <Brands />
    </div>
  );
};

export default Home;
