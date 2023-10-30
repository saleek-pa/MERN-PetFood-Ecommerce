import React, { useContext } from "react";
import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { PetContext } from "../App";
import axios from "axios";
import "../Styles/Reg-Login.css";

function Registration() {
  const { profile, setProfile } = useContext(PetContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      e.target.fullName.value.trim() === "" ||
      e.target.email.value.trim() === "" ||
      e.target.password.value.trim() === ""
    ) {
      alert("Enter All the Inputs");
    } else {
      const id = profile.length;
      const name = e.target.fullName.value;
      const email = e.target.email.value;
      const password = e.target.password.value;
      setProfile([...profile, { id, name, email, password, orders: [] }]);

      const userData = { name, email, password };

      try {
        const response = await axios.post(
          "http://localhost:8000/api/users/register",
          userData
        );
        response.status === 200 && navigate("/login");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <MDBContainer className="form-container">
      <form onSubmit={handleSubmit}>
        <h1 className="mb-3 text-black">Create an account</h1>
        <MDBInput
          wrapperClass="mb-4 p-1"
          label="Full Name"
          name="fullName"
          id="form1"
          type="text"
          required
        />
        <MDBInput
          wrapperClass="mb-4 p-1"
          label="Email Address"
          name="email"
          id="form2"
          type="email"
          required
        />
        <MDBInput
          wrapperClass="mb-4 p-1"
          label="Password"
          name="password"
          id="form3"
          type="password"
          required
        />

        <MDBBtn type="submit" className="mb-4 w-100" color="black">
          Create Account
        </MDBBtn>

        <div className="pointer text-center">
          <p>
            Already have an account?{" "}
            <span
              className="text-dark fw-bold"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </form>
    </MDBContainer>
  );
}

export default Registration;
