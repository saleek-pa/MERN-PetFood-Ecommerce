import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function SuccessPayment() {
   const navigate = useNavigate();

   useEffect(() => {
      const fetchData = async () => {
         try {
            await axios.get(`http://localhost:8000/api/users/payment/success`);
            toast.success("Payment successful");
            setTimeout(() => {
               navigate("/");
            }, 3000);
         } catch (error) {
            toast.error(error.response.data.message);
            navigate("/");
         }
      };

      fetchData();
   }, [navigate]);

   return (
      <div className="payment-success">
         <img
            src="https://assets.materialup.com/uploads/9ba2d687-d7d3-4361-8aee-7b2a3c074761/preview.gif"
            alt="Success"
         />
      </div>
   );
}
