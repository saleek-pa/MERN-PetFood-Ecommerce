import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PetContext } from "../App";
import {
   MDBBtn,
   MDBCard,
   MDBCardBody,
   MDBCardImage,
   MDBCardText,
   MDBCol,
   MDBContainer,
   MDBIcon,
   MDBRow,
   MDBTypography,
} from "mdb-react-ui-kit";
import "../Styles/Cart.css";
import axios from "axios";

export default function Cart() {
   const { userID, cart, setCart, handlePrice, tokenConfig } = useContext(PetContext);

   const navigate = useNavigate();

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.get(`http://localhost:8000/api/users/${userID}/cart`, tokenConfig);
            if (response.status === 200) {
               setCart(response.data.data);
            }
         } catch (error) {
            alert(error.response.data.message);
         }
      };

      fetchData();
   }, [userID, setCart, tokenConfig]);

   //  Calculate the total price of items in the cart
   const totalPrice = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

   // Handle changes in item quantity
   const handleQuantity = async (cartID, quantityChange) => {
      const data = { id: cartID, quantityChange };

      try {
         await axios.put(`http://localhost:8000/api/users/${userID}/cart`, data, tokenConfig);
         const response = await axios.get(`http://localhost:8000/api/users/${userID}/cart`, tokenConfig);
         if (response.status === 200) {
            setCart(response.data.data);
         }
      } catch (error) {
         alert(error.response.data.message);
      }
   };

   // Remove an item from the cart
   const removeFromCart = async (productID) => {
      try {
         await axios.delete(`http://localhost:8000/api/users/${userID}/cart/${productID}`, tokenConfig);
      } catch (error) {
         alert(error.response.data.message);
      }
   };

   // Handle the checkout process
   const handleCheckout = async () => {
      try {
         const response = await axios.post(`http://localhost:8000/api/users/${userID}/payment`);
         if (response.status === 200) {
            const url = response.data.url;
            const confirmation = window.confirm("You are being redirected to the Stripe payment gateway. Continue?");
            if (confirmation) {
               window.location.replace(url);
            }
         }
      } catch (error) {
         alert(error.response.data.message);
      }
   };

   return (
      <section
         className="h-100 text-black"
         style={{
            backgroundColor: "#eee",
            paddingTop: "100px",
            paddingBottom: "70px",
         }}
      >
         <MDBContainer className="py-5 h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
               <MDBCol size="12">
                  <MDBCard className="card-registration card-registration-2" style={{ borderRadius: "15px" }}>
                     <MDBCardBody className="p-0">
                        <MDBRow className="g-0">
                           <MDBCol lg="8">
                              <div className="p-5">
                                 {cart.map((item) => (
                                    <MDBRow
                                       className="mb-4 d-flex justify-content-between align-items-center"
                                       key={item._id}
                                    >
                                       <MDBCol md="2" lg="2" xl="2">
                                          <MDBCardImage
                                             src={item.product.image}
                                             fluid
                                             className="cart-image rounded-3"
                                             alt={item.product.title}
                                          />
                                       </MDBCol>
                                       <MDBCol md="3" lg="3" xl="3" className="cart-details">
                                          <MDBTypography tag="h6" className="text-muted">
                                             {item.product.category}
                                          </MDBTypography>
                                          <MDBTypography tag="h6" className="text-black mb-0">
                                             {item.product.title}
                                          </MDBTypography>
                                       </MDBCol>
                                       <MDBCol
                                          md="3"
                                          lg="3"
                                          xl="3"
                                          className="cart-quantity d-flex align-items-center justify-content-center"
                                       >
                                          <MDBBtn
                                             color="link"
                                             className="px-2"
                                             onClick={() => handleQuantity(item._id, -1)}
                                          >
                                             <MDBIcon fas icon="minus" />
                                          </MDBBtn>

                                          <span className="px-3 square border border-secondary">{item.quantity}</span>

                                          <MDBBtn
                                             color="link"
                                             className="px-2"
                                             onClick={() => handleQuantity(item._id, 1)}
                                          >
                                             <MDBIcon fas icon="plus" />
                                          </MDBBtn>
                                       </MDBCol>
                                       <MDBCol md="3" lg="2" xl="2" className="text-end">
                                          <MDBTypography tag="h6" className="cart-item-price emb-0">
                                             {handlePrice(item.product.price * item.quantity)}
                                          </MDBTypography>
                                       </MDBCol>
                                       <MDBCol md="1" lg="1" xl="1" className="cart-delete text-end">
                                          <span
                                             href=""
                                             // className="text-danger"
                                             onClick={(e) => {
                                                e.preventDefault();
                                                removeFromCart(item.product._id);
                                             }}
                                          >
                                             <MDBIcon fas icon="trash-alt" />
                                          </span>
                                       </MDBCol>
                                       <hr className="cart-line my-4" />
                                    </MDBRow>
                                 ))}

                                 <div className="pt-5 pb-5">
                                    <MDBTypography tag="h6" className="mb-0">
                                       <MDBCardText
                                          tag="a"
                                          href=""
                                          className="text-body"
                                          onClick={(e) => {
                                             e.preventDefault();
                                             navigate("/products");
                                          }}
                                       >
                                          <MDBIcon fas icon="long-arrow-alt-left me-2" /> Back to shop
                                       </MDBCardText>
                                    </MDBTypography>
                                 </div>
                              </div>
                           </MDBCol>
                           <MDBCol lg="4" className="bg-grey">
                              <div className="p-5">
                                 <MDBTypography tag="h3" className="fw-bold mb-5 mt-2 pt-1">
                                    Summary
                                 </MDBTypography>

                                 <hr className="my-4" />

                                 <div className="d-flex justify-content-between mb-5">
                                    <MDBTypography tag="h5" className="text-uppercase">
                                       Total price
                                    </MDBTypography>
                                    <MDBTypography tag="h5">{handlePrice(totalPrice)}.00</MDBTypography>
                                 </div>

                                 <MDBBtn color="dark" block size="lg" onClick={handleCheckout}>
                                    Checkout
                                 </MDBBtn>
                              </div>
                           </MDBCol>
                        </MDBRow>
                     </MDBCardBody>
                  </MDBCard>
               </MDBCol>
            </MDBRow>
         </MDBContainer>
      </section>
   );
}
