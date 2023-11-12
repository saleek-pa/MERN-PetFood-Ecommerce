import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MDBIcon } from "mdb-react-ui-kit";
import { PetContext } from "../App";
import "../Styles/Products.css";
import toast from "react-hot-toast";

function Products() {
   const {
      loginStatus, userID, productDetails, handlePrice, FetchWishlist,
      wishlist, setWishlist, addToWishlist, removeFromWishlist,
   } = useContext(PetContext);

   const DogFood = productDetails.filter((value) => value.category === "Dog").slice(0, 4);
   const CatFood = productDetails.filter((value) => value.category === "Cat").slice(0, 4);
   const bestSellingProduct = [...DogFood, ...CatFood];
   const navigate = useNavigate();

   FetchWishlist(loginStatus, userID, setWishlist);

   return (
      <>
         <section className="products d-flex flex-column align-items-center">
            <h1 className="mt-5 text-black fw-bolder">
               <span>Best</span> Seller
            </h1>

            <div className="product-content">
               {bestSellingProduct.map((value) => (
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
                           <MDBIcon
                              fas icon="heart" className="clicked-heart-icon"
                              onClick={() => removeFromWishlist(value._id)}
                           />
                        ) : (
                           <MDBIcon
                              fas icon="heart" className="heart-icon"
                              onClick={() => {
                                 loginStatus ? addToWishlist(value._id) : toast.error("Sign in to your account");
                              }}
                           />
                        )}
                     </div>
                  </div>
               ))}
            </div>
         </section>
      </>
   );
}

export default Products;
