import React, { useContext } from 'react';
import ProductList from '../Components/ProductList';
import { PetContext } from '../Context/Context';

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
