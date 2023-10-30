import React, { useContext } from "react";
import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { PetContext } from "../App";
import "../Styles/Reg-Login.css";

function Login() {
  const { profile, setLoginStatus, setName } = useContext(PetContext);
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      e.target.email.value.trim() === "" ||
      e.target.password.value.trim() === ""
    ) {
      alert("Enter All the Inputs");
    } else {
      const Email = e.target.email.value.toLowerCase();
      const Password = e.target.password.value;
      const Account = profile.filter(
        (account) => account.email === Email && account.password === Password
      );

      if (Account.length > 0) {
        // Set login status to true and update the user's name
        setLoginStatus(true);
        setName(Account[0].name);
        if (Account[0].role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      } else {
        alert("Email Not Registered or Incorrect Password");
      }
    }
  };
  return (
    <MDBContainer className="form-container">
      <form onSubmit={handleSubmit}>
        <h1 className="mb-3 text-black">Welcome back</h1>
        <MDBInput
          wrapperClass="mb-4 p-1"
          label="Email Address"
          id="form2"
          type="email"
          name="email"
          required
        />
        <MDBInput
          wrapperClass="mb-4 p-1"
          label="Password"
          id="form3"
          type="password"
          name="password"
          required
        />

        <MDBBtn type="submit" className="mb-4 w-100" color="black">
          Log in
        </MDBBtn>

        <div className="pointer text-center">
          <p>
            Don't have an account?{" "}
            <span
              className="text-black fw-bold"
              onClick={() => navigate("/registration")}
            >
              Register
            </span>
          </p>
        </div>
      </form>
    </MDBContainer>
  );
}

export default Login;
