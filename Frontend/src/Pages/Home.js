import React from "react";
import Header from "./Header";
import Categories from "./Categories";
import Products from "./Products";
import Services from "./Services";
import Brands from "./Brands";
import "../Styles/Home.css";

const Home = () => {
  return (
    <div>
      <Header />
      <Categories />
      <Products />
      <Services />
      <Brands />
    </div>
  );
};

export default Home;
