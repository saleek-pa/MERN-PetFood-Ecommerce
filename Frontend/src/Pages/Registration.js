import React from "react";
import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

function Registration() {
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();

      const name = e.target.name.value.trim();
      const email = e.target.email.value.trim();
      const password = e.target.password.value.trim();

      if (name === "" || email === "" || password === "") {
         toast.error("Enter All the Inputs");
      } else {
         try {
            const userData = { name, email, password };
            const response = await axios.post("http://localhost:8000/api/users/register", userData);
            if (response.status === 201) {
               toast.success(response.data.message);
               navigate("/login");
            }
         } catch (error) {
            toast.error(error.response.data.message);
         }
      }
   };

   return (
      <MDBContainer className="form-container">
         <form onSubmit={handleSubmit}>
            <h1 className="mb-3 text-black">Create an account</h1>
            <MDBInput wrapperClass="mb-4 p-1" label="Full Name" name="name" id="form1" type="text" required />
            <MDBInput wrapperClass="mb-4 p-1" label="Email Address" name="email" id="form2" type="email" required />
            <MDBInput wrapperClass="mb-4 p-1" label="Password" name="password" id="form3" type="password" required />

            <MDBBtn type="submit" className="mb-4 w-100" color="black">
               Create Account
            </MDBBtn>

            <div className="pointer text-center">
               <p>
                  Already have an account?{" "}
                  <span className="text-dark fw-bold" onClick={() => navigate("/login")}>
                     Login
                  </span>
               </p>
            </div>
         </form>
      </MDBContainer>
   );
}

export default Registration;
