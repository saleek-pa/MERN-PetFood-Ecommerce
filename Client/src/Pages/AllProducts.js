import React, { useContext } from 'react';
import ProductList from '../Components/ProductList';
import { PetContext } from '../Context/Context';

export default function DogFood() {
  const { products } = useContext(PetContext);

  return (
    <>
      <section className="products d-flex flex-column align-items-center mb-5" style={{ paddingTop: '80px' }}>
        <h1 className="mt-5 text-black fw-bolder">
          <span>Our</span> Products
        </h1>

        <ProductList products={products} />
      </section>
    </>
  );
}
