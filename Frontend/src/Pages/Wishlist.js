import React, { useContext, useEffect } from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import { PetContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Wishlist() {
   const { handlePrice, loginStatus, wishlist, setWishlist, userID, tokenConfig } = useContext(PetContext);
   const navigate = useNavigate();

   useEffect(() => {
      const fetchData = async () => {
         try {
            if (loginStatus) {
               const response = await axios.get(`http://localhost:8000/api/users/${userID}/wishlist`, tokenConfig);
               if (response.status === 200) {
                  setWishlist(response.data.data);
               }
            }
         } catch (error) {
            // alert(error.response.data.message);
         }
      };

      fetchData();
   }, [loginStatus, userID, setWishlist, tokenConfig]);

   const removeFromWishlist = async (productID) => {
      try {
         await axios.delete(`http://localhost:8000/api/users/${userID}/wishlist/${productID}`, tokenConfig);
         const response = await axios.get(`http://localhost:8000/api/users/${userID}/wishlist`, tokenConfig);
         if (response.status === 200) {
            setWishlist(response.data.data);
         }
      } catch (error) {
         alert(error.response.data.message);
      }
   };

   return (
      <>
         <section className="products d-flex flex-column align-items-center mb-5" style={{ paddingTop: "80px" }}>
            <h1 className="mt-5 text-black fw-bolder">
               <span>My</span> Wishlist
            </h1>

            <div className="product-content">
               {wishlist.length !== 0 ? (
                  wishlist.map((value) => (
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
                           {wishlist.some((item) => item._id === value._id) && (
                              <MDBIcon
                                 fas
                                 icon="heart"
                                 className="clicked-heart-icon"
                                 onClick={() => removeFromWishlist(value._id)}
                              />
                           )}
                        </div>
                     </div>
                  ))
               ) : (
                  <h1>Wishlist is Empty!</h1>
               )}
            </div>
         </section>
      </>
   );
}
