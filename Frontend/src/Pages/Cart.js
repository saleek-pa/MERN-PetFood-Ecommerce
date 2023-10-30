import React, { useContext } from "react";
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

export default function Cart() {
  const navigate = useNavigate();
  const { cart, setCart, profile, setProfile, name, orderId, setOrderId } =
    useContext(PetContext);

  // Calculate the total price of items in the cart
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Handle changes in item quantity
  const handleQuantity = (id, quantityChange) => {
    const newCart = cart.map((data) => {
      if (data.id === id && data.quantity > 0) {
        return { ...data, quantity: data.quantity + quantityChange || 1 };
      }
      return data;
    });
    setCart(newCart);
  };

  // Remove an item from the cart
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  // Handle the checkout process
  const handleCheckout = (e) => {
    e.preventDefault();

    if (cart.length !== 0) {
      const newOrderItem = cart.map((item, index) => ({
        orderId: orderId + index + 1,
        product: item.name,
        quantity: item.quantity,
        price: item.price,
      }));
      setOrderId(orderId + 1);

      // Update user's profile with new orders
      const updatedProfile = profile.map((user) => {
        if (user.name === name) {
          return {
            ...user,
            orders: [...user.orders, ...newOrderItem],
          };
        }
        return user;
      });
      setProfile(updatedProfile);

      alert("Order Placed");
      setCart([]);
    } else {
      alert("Cart is Empty!");
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
            <MDBCard
              className="card-registration card-registration-2"
              style={{ borderRadius: "15px" }}
            >
              <MDBCardBody className="p-0">
                <MDBRow className="g-0">
                  <MDBCol lg="8">
                    <div className="p-5">
                      {cart.map((item) => (
                        <MDBRow
                          className="mb-4 d-flex justify-content-between align-items-center"
                          key={item.id}
                        >
                          <MDBCol md="2" lg="2" xl="2">
                            <MDBCardImage
                              src={item.src}
                              fluid
                              className="cart-image rounded-3"
                              alt={item.name}
                            />
                          </MDBCol>
                          <MDBCol md="3" lg="3" xl="3" className="cart-details">
                            <MDBTypography tag="h6" className="text-muted">
                              {item.category}
                            </MDBTypography>
                            <MDBTypography tag="h6" className="text-black mb-0">
                              {item.name}
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
                              onClick={() => handleQuantity(item.id, -1)}
                            >
                              <MDBIcon fas icon="minus" />
                            </MDBBtn>

                            <span className="px-3 square border border-secondary">
                              {item.quantity}
                            </span>

                            <MDBBtn
                              color="link"
                              className="px-2"
                              onClick={() => handleQuantity(item.id, 1)}
                            >
                              <MDBIcon fas icon="plus" />
                            </MDBBtn>
                          </MDBCol>
                          <MDBCol md="3" lg="2" xl="2" className="text-end">
                            <MDBTypography tag="h6" className="cart-item-price emb-0">
                              ₹{item.price * item.quantity}
                            </MDBTypography>
                          </MDBCol>
                          <MDBCol md="1" lg="1" xl="1" className="cart-delete text-end">
                            <span
                              href=""
                              className="text-muted"
                              onClick={(e) => {
                                e.preventDefault();
                                removeFromCart(item.id);
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
                            <MDBIcon fas icon="long-arrow-alt-left me-2" /> Back
                            to shop
                          </MDBCardText>
                        </MDBTypography>
                      </div>
                    </div>
                  </MDBCol>
                  <MDBCol lg="4" className="bg-grey">
                    <div className="p-5">
                      <MDBTypography
                        tag="h3"
                        className="fw-bold mb-5 mt-2 pt-1"
                      >
                        Summary
                      </MDBTypography>

                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-5">
                        <MDBTypography tag="h5" className="text-uppercase">
                          Total price
                        </MDBTypography>
                        <MDBTypography tag="h5">₹{totalPrice}.00</MDBTypography>
                      </div>

                      <MDBBtn
                        color="dark"
                        block
                        size="lg"
                        onClick={handleCheckout}
                      >
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
