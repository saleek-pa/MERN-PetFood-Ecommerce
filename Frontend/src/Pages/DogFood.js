import React, { useContext } from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import { PetContext } from "../App";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function DogFood() {
   const {
      loginStatus, userID, productDetails, handlePrice, FetchWishlist,
      wishlist, setWishlist, addToWishlist, removeFromWishlist
   } = useContext(PetContext);
   const navigate = useNavigate();
   const DogFood = productDetails.filter((value) => value.category === "Dog");

   FetchWishlist(loginStatus, userID, setWishlist);

   return (
      <>
         <section className="products d-flex flex-column align-items-center mb-5" style={{ paddingTop: "80px" }}>
            <h1 className="mt-5 text-black fw-bolder">
               <span>Dog</span> Food
            </h1>

            <div className="product-content">
               {DogFood.map((value) => (
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
