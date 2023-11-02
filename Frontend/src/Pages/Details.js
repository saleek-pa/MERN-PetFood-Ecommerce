import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Styles/Details.css";
import "../Styles/Home.css";
import { MDBBtn } from "mdb-react-ui-kit";
import { PetContext } from "../App";
import axios from "axios";

export default function Details() {
   const { id } = useParams();
   const { loginStatus, userID } = useContext(PetContext);
   const [item, setItem] = useState([]);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.get(`http://localhost:8000/api/users/products/${id}`);
            if (response.status === 200) {
               setItem(response.data.data);
            }
         } catch (error) {
            alert(error.response.data.message);
         }
      };

      fetchData();
   }, [id]);

   // Function to add the current product to the cart
   const addToCart = async (productID) => {
      try {
         const response = await axios.post(`http://localhost:8000/api/users/${userID}/cart`, { productID });
         if (response.status === 200) {
            alert(response.data.message);
         }
      } catch (error) {
         alert(error.response.data.message);
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
                     <MDBBtn
                        rounded
                        color="dark"
                        className="det-button"
                        onClick={() => {
                           if (loginStatus) {
                              addToCart(item._id);
                           } else {
                              alert("Sign in to your account");
                           }
                        }}
                     >
                        Add to Cart
                     </MDBBtn>
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
