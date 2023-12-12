import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Styles/Details.css";
import "../Styles/Home.css";
import { MDBBtn } from "mdb-react-ui-kit";
import { Axios, PetContext } from "../App";
import toast from "react-hot-toast";

export default function Details() {
   const { id } = useParams();
   const navigate = useNavigate();
   const [item, setItem] = useState([]);
   const { loginStatus, userID, cart, setCart } = useContext(PetContext);


   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await Axios.get(`/api/users/products/${id}`);
            setItem(response.data.data);
         } catch (error) {
            toast.error(error.response.data.message);
         }
      };

      fetchData();
   }, [id]);


   // Function to add the current product to the cart
   const addToCart = async (productID) => {
      try {
         await Axios.post(`/api/users/${userID}/cart`, { productID });
         const response = await Axios.get(`/api/users/${userID}/cart`);
         setCart(response.data.data);
         toast.success("Added to cart");
      } catch (error) {
         toast.error(error.response.data.message);
      }
   };
   

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
                     {cart.some((value) => value.product._id === id) ? (
                        <MDBBtn rounded color="dark" className="det-button" onClick={() => navigate("/cart")}>
                           Go to Cart
                        </MDBBtn>
                     ) : (
                        <MDBBtn
                           rounded color="dark" className="det-button"
                           onClick={() => {
                              loginStatus ? addToCart(item._id) : toast.error("Sign in to your account");
                           }}
                        >
                           Add to Cart
                        </MDBBtn>
                     )}
                  </div>
                  <div>
                     <MDBBtn rounded className="det-button" style={{ backgroundColor: "#ed6335" }}>
                        Buy Now
                     </MDBBtn>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
