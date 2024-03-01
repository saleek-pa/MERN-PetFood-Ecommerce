import React, { useState, useEffect } from 'react';
import ProductList from '../Components/ProductList';
import { axios } from '../Utils/Axios';
import toast from 'react-hot-toast';

export default function DogFood() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/users/products');
        setProducts(response.data.data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchData();
  }, []);


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
