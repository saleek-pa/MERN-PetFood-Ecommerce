import React, { useState, useEffect, useContext } from 'react';
import ProductList from '../Components/ProductList';
import { PetContext } from '../Context/Context';

export default function CatFood() {
  const { fetchCatFood } = useContext(PetContext);
  const [catFood, setCatFood] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const products = await fetchCatFood();
      setCatFood(products);
    };

    fetchData();
  }, [fetchCatFood]);

  return (
    <>
      <section className="products d-flex flex-column align-items-center mb-5" style={{ paddingTop: '80px' }}>
        <h1 className="mt-5 text-black fw-bolder">
          <span>Cat</span> Food
        </h1>

        <ProductList products={catFood} />
      </section>
    </>
  );
}
