import React from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import "../Styles/Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate()
  return (
    <header className="header">
      <div className="header-info">
        <h2>HIGH QUALITY</h2>
        <h1>PET FOOD</h1>
        <p>Sale up to 40% off today</p>
        <MDBBtn
          color="black"
          className="header-button"
          onClick={(e) => {
            e.preventDefault();
            navigate("/products");
          }}
        >
          Shop Now
        </MDBBtn>
      </div>
    </header>
  );
};

export default Header;
