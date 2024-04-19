import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PetContext } from '../Context/Context';
import { MDBIcon } from 'mdb-react-ui-kit';
import toast from 'react-hot-toast';
import Loading from './Loading';

function ProductList({ products }) {
  const navigate = useNavigate();
  const { loginStatus, handlePrice, wishlist, addToWishlist, removeFromWishlist } = useContext(PetContext);
  if (products.length === 0) {
    return <Loading />;
  }

  return (
    <div className="product-content">
      {products?.map((value) => (
        <div className="box" key={value._id}>
          <div className="box-img" onClick={() => navigate(`/products/${value._id}`)}>
            <img src={value.image} alt={value.title} />
          </div>
          <h3 onClick={() => navigate(`/products/${value._id}`)}>{value.title}</h3>
          <div className="inbox">
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
