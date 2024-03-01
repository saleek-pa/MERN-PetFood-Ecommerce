import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PetContext } from '../Utils/Context';
import { MDBIcon } from 'mdb-react-ui-kit';
import { axios } from '../Utils/Axios';
import toast from 'react-hot-toast';

function ProductList({ products }) {
  const navigate = useNavigate();
  const { loginStatus, handlePrice, wishlist, addToWishlist, removeFromWishlist, setWishlist } = useContext(PetContext);
  const userID = localStorage.getItem('userID');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (loginStatus) {
          const response = await axios.get(`/api/users/${userID}/wishlist`);
          setWishlist(response.data.data);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchData();
  }, [loginStatus, userID, setWishlist]);

  return (
    <div className="product-content">
      {products?.map((value) => (
        <div className="box" key={value._id}>
          <div className="box-img" onClick={() => navigate(`/products/${value._id}`)}>
            <img src={value.image} alt={value.title} />
          </div>
          <h3 onClick={() => navigate(`/products/${value._id}`)}>{value.title}</h3>
          <div className="inbox">
            <span className="strike-price">{handlePrice(Math.floor(value.price * 1.2))}</span>
            <span className="price">{handlePrice(value.price)}</span>
          </div>
          <div className="heart">
            {wishlist.some((item) => item._id === value._id) ? (
              <MDBIcon fas icon="heart" className="clicked-heart-icon" onClick={() => removeFromWishlist(value._id)} />
            ) : (
              <MDBIcon
                fas
                icon="heart"
                className="heart-icon"
                onClick={() => {
                  loginStatus ? addToWishlist(value._id) : toast.error('Sign in to your account');
                }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
