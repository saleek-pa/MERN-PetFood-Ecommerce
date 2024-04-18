import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PetContext } from '../Context/Context';
import Button from '../Components/Button';
import toast from 'react-hot-toast';
import '../Styles/Details.css';
import '../Styles/Home.css';

export default function Details() {
  const { id } = useParams();
  const { fetchProductDetails, loginStatus, cart, addToCart } = useContext(PetContext);
  const [item, setItem] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const products = await fetchProductDetails(id);
      setItem(products);
    };

    fetchData();
  }, [id, fetchProductDetails]);

  return (
    <>
      <div className="details d-flex flex-column flex-md-row align-items-center pb-3">
        <div className="w-100 w-md-50 d-flex justify-content-center align-items-center">
          <img src={item.image} alt={item.title} />
        </div>
        <div className="d-flex flex-column w-100 w-md-50 text-black me-5 ms-5">
          <h1 className="fw-bold mb-3">{item.title}</h1>
          <h4 className="fw-bold mb-3">₹{item.price}</h4>
          <hr />
          <p className="mt-3 text-muted mb-4">{item.description}</p>
          <div className="d-flex align-items-center gap-3">
            <div>
              {cart?.some((value) => value.product._id === id) ? (
                <Button rounded color="dark" className="det-button" onClick={() => navigate('/cart')}>
                  Go to Cart
                </Button>
              ) : (
                <Button
                  rounded
                  color="dark"
                  className="det-button"
                  onClick={() => {
                    loginStatus ? addToCart(item._id) : toast.error('Sign in to your account');
                  }}
                >
                  Add to Cart
                </Button>
              )}
            </div>
            <div>
              <Button rounded className="det-button" style={{ backgroundColor: '#ed6335' }}>
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
