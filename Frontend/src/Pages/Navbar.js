import React, { useState, useContext } from "react";
import { PetContext } from "../App";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarLink,
  MDBIcon,
  MDBCollapse,
  MDBBadge,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import "../Styles/Navbar.css";

const Navbar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [showCollapse, setShowCollapse] = useState(false);
  const { productDetails, cart, loginStatus, setLoginStatus, name } =
    useContext(PetContext);
  const navigate = useNavigate();

  // Toggle search box visibility
  const toggleSearchBox = (e) => {
    e.preventDefault();
    setShowSearchBox(!showSearchBox);
  };

  // Toggle mobile navbar
  const toggleNavbar = () => {
    setShowCollapse(!showCollapse);
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    const searchText = event.target.value;
    setSearchInput(searchText);

    if (searchText !== "") {
      const filtered = productDetails.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
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
          <MDBNavbarBrand href="" className="logo">
            <h1
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              Kitter
            </h1>
          </MDBNavbarBrand>
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
            <div
              style={{ lineHeight: "13px" }}
              className="greeting text-center me-3"
            >
              <span
                style={{ fontSize: "15px", cursor: "pointer" }}
                onClick={() => {
                  if (!loginStatus) navigate("/login");
                }}
              >
                Hello,
                <br />
                {loginStatus ? <>{name}</> : <>Sign In</>}
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
                top: "40px",
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
                    key={product.id}
                    className="ps-3 text-black fw-bold"
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setFilteredProducts([]);
                      setSearchInput("");
                      navigate(`/products/${product.id}`);
                    }}
                  >
                    {product.name}
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
                  if (loginStatus) {
                    navigate("/cart");
                  } else {
                    alert("Sign in to your account");
                  }
                }}
              >
                <MDBIcon fas icon="shopping-cart" />

                {loginStatus && cart.length > 0 && (
                  <MDBBadge
                    color="dark"
                    notification
                    pill
                    style={{ color: "white" }}
                  >
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
