import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PetContext } from "../App";
import {
   MDBContainer,
   MDBNavbar,
   MDBNavbarToggler,
   MDBNavbarNav,
   MDBNavbarLink,
   MDBIcon,
   MDBCollapse,
   MDBBadge,
} from "mdb-react-ui-kit";
import "../Styles/Navbar.css";
import toast from "react-hot-toast";

const Navbar = () => {
   const [searchInput, setSearchInput] = useState("");
   const [filteredProducts, setFilteredProducts] = useState([]);
   const [showSearchBox, setShowSearchBox] = useState(false);
   const [showCollapse, setShowCollapse] = useState(false);
   const { productDetails, cart, setCart, loginStatus, setLoginStatus, userID, tokenConfig, FetchCart } =
      useContext(PetContext);
   const name = localStorage.getItem("name");
   const navigate = useNavigate();

   FetchCart(loginStatus, userID, setCart, tokenConfig);

   const toggleSearchBox = () => setShowSearchBox(!showSearchBox); // Toggle search box visibility
   const toggleNavbar = () => setShowCollapse(!showCollapse); // Toggle mobile navbar

   // Handle search input change
   const handleSearchChange = (event) => {
      const searchText = event.target.value;
      setSearchInput(searchText);

      if (searchText !== "") {
         const filtered = productDetails.filter((product) =>
            product.title.toLowerCase().includes(searchText.toLowerCase())
         );
         setFilteredProducts(filtered.slice(0, 6));
      } else {
         setFilteredProducts([]);
      }
   };

   return (
      <div>
         <MDBNavbar expand="lg" className="nav-container">
            <MDBContainer fluid>
               <MDBNavbarToggler
                  data-mdb-toggle="collapse"
                  data-mdb-target="#navbarCollapse"
                  aria-label="Toggle navigation"
                  onClick={toggleNavbar}
               >
                  <MDBIcon icon="bars" fas />
               </MDBNavbarToggler>
               <h1
                  className="logo"
                  onClick={(e) => {
                     e.preventDefault();
                     navigate("/");
                  }}
               >
                  Kitter
               </h1>
               <MDBCollapse navbar show={showCollapse} id="navbarCollapse">
                  <MDBNavbarNav className="navbar-links">
                     <MDBNavbarLink
                        href=""
                        onClick={(e) => {
                           e.preventDefault();
                           navigate("/");
                           setShowCollapse(!showCollapse);
                        }}
                     >
                        Home
                     </MDBNavbarLink>
                     <MDBNavbarLink
                        href=""
                        onClick={(e) => {
                           e.preventDefault();
                           navigate("/products");
                           setShowCollapse(!showCollapse);
                        }}
                     >
                        Products
                     </MDBNavbarLink>
                     <MDBNavbarLink
                        href=""
                        onClick={(e) => {
                           e.preventDefault();
                           navigate("/cat-food");
                           setShowCollapse(!showCollapse);
                        }}
                        className="nav-food"
                     >
                        Cat Food
                     </MDBNavbarLink>
                     <MDBNavbarLink
                        href=""
                        onClick={(e) => {
                           e.preventDefault();
                           navigate("/dog-food");
                           setShowCollapse(!showCollapse);
                        }}
                        className="nav-food"
                     >
                        Dog Food
                     </MDBNavbarLink>
                  </MDBNavbarNav>
               </MDBCollapse>

               <div className="navbar-icons d-flex">
                  <div style={{ lineHeight: "13px" }} className="greeting text-center me-3">
                     <span
                        style={{ fontSize: "15px", cursor: "pointer" }}
                        onClick={() => {
                           if (!loginStatus) navigate("/login");
                        }}
                     >
                        Hello,
                        <br />
                        {loginStatus && name ? <>{name.split(" ")[0]}</> : <>Sign In</>}
                     </span>
                  </div>
                  <div>
                     {showSearchBox && (
                        <div className="search-box">
                           <input
                              type="text"
                              placeholder="Search..."
                              value={searchInput.length >= 1 ? searchInput : ""}
                              onChange={handleSearchChange}
                           />
                        </div>
                     )}
                     <div className="search-icon me-3 me-lg-0">
                        <span className="nav-link" onClick={toggleSearchBox}>
                           <MDBIcon fas icon="search" />
                        </span>
                     </div>
                  </div>
                  <ul
                     style={{
                        position: "absolute",
                        listStyle: "none",
                        backgroundColor: "white",
                        width: "405px",
                        right: "157px",
                        top: "25px",
                        borderRadius: "10px",
                        paddingLeft: "0",
                        paddingTop: "50px",
                        zIndex: "-1",
                     }}
                     className="search-output"
                  >
                     {filteredProducts.map((product) => (
                        <>
                           <li
                              key={product._id}
                              className="ps-3 text-black fw-bold"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                 setFilteredProducts([]);
                                 setSearchInput("");
                                 navigate(`/products/${product._id}`);
                              }}
                           >
                              {product.title}
                           </li>
                           <hr className="m-3" />
                        </>
                     ))}
                  </ul>

                  <div className="me-3 px-3 me-lg-0">
                     <span className="nav-link">
                        <MDBIcon fas icon="user" className="profile">
                           <div className="profile-container">
                              <ul className="profile-list">
                                 {loginStatus ? (
                                    <>
                                       <li>My Profile</li>
                                       <hr />
                                       <li
                                          onClick={() => {
                                             navigate("/orders");
                                          }}
                                       >
                                          Orders
                                       </li>
                                       <hr />
                                       <li
                                          onClick={() => {
                                             navigate("/wishlist");
                                          }}
                                       >
                                          Wishlist
                                       </li>
                                       <hr />
                                       <li
                                          onClick={() => {
                                             localStorage.clear();
                                             setLoginStatus(false);
                                             navigate("/");
                                          }}
                                       >
                                          Log Out
                                       </li>
                                    </>
                                 ) : (
                                    <>
                                       <li onClick={() => navigate("/login")}>Sign In</li>
                                    </>
                                 )}
                              </ul>
                           </div>
                        </MDBIcon>
                     </span>
                  </div>
                  <div className="me-3 me-lg-0">
                     <span
                        className="nav-link"
                        onClick={() => {
                           if (loginStatus) navigate("/cart");
                           else toast.error("Sign in to your account");
                        }}
                     >
                        <MDBIcon fas icon="shopping-cart" />

                        {loginStatus && cart.length > 0 && (
                           <MDBBadge color="dark" notification pill style={{ color: "white" }}>
                              {cart.length}
                           </MDBBadge>
                        )}
                     </span>
                  </div>
               </div>
            </MDBContainer>
         </MDBNavbar>
      </div>
   );
};

export default Navbar;
