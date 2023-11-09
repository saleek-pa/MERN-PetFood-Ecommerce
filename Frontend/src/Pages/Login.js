import React, { useContext } from "react";
import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { PetContext } from "../App";
import toast from 'react-hot-toast';
import axios from "axios";

function Login() {
   const { setLoginStatus } = useContext(PetContext);
   const navigate = useNavigate();

   // Function to handle form submission
   const handleSubmit = async (e) => {
      e.preventDefault();

      const email = e.target.email.value.trim().toLowerCase();
      const password = e.target.password.value;
      const loginData = { email, password };
      const adminEmail = process.env.REACT_APP_ADMIN_EMAIL;

      if (email === "" || password === "") {
         return toast.error("Enter All the Inputs");
      }

      const endpoint =
         email === adminEmail ? "http://localhost:8000/api/admin/login" : "http://localhost:8000/api/users/login";

      try {
         const response = await axios.post(endpoint, loginData);
         if (response.status === 200) {
            email !== adminEmail && localStorage.setItem("userID", response.data.data.userID);
            email === adminEmail && localStorage.setItem("role", "admin");
            localStorage.setItem("jwt_token", response.data.data.jwt_token);
            localStorage.setItem("name", response.data.data.name);
            setLoginStatus(true);
            toast.success(response.data.message);
            navigate(email === adminEmail ? "/dashboard" : "/");

            setTimeout(() => {
               localStorage.clear();
               setLoginStatus(false)
            }, 3600000);
         }
      } catch (error) {
         toast.error(error.response.data.message);
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
               value={"12345678"}
               required
            />

            <MDBBtn type="submit" className="mb-4 w-100" color="black">
               Log in
            </MDBBtn>

            <div className="pointer text-center">
               <p>
                  Don't have an account?{" "}
                  <span className="text-black fw-bold" onClick={() => navigate("/registration")}>
                     Register
                  </span>
               </p>
            </div>
         </form>
      </MDBContainer>
   );
}

export default Login;
