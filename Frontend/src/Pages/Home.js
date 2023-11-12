import React from "react";
import Header from "../Components/Header";
import Categories from "../Components/Categories";
import Products from "../Components/Products";
import Services from "../Components/Services";
import Brands from "../Components/Brands";
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
