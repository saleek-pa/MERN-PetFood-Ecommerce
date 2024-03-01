import React, { useContext } from 'react';
import { PetContext } from '../Utils/Context';
import ProductList from '../Components/ProductList';

export default function Wishlist() {
  const { wishlist } = useContext(PetContext);

  return (
    <>
      <section className="products d-flex flex-column align-items-center mb-5" style={{ paddingTop: '80px' }}>
        <h1 className="mt-5 text-black fw-bolder">
          <span>My</span> Wishlist
        </h1>
        <ProductList products={wishlist} />
        {wishlist.length === 0 && <h1 className="my-5 py-5">Wishlist is empty</h1>}
      </section>
    </>
  );
}
