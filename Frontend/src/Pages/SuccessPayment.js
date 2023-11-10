import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PetContext } from "../App";
import { Axios } from "../App";
import toast from "react-hot-toast";

export default function SuccessPayment() {
   const navigate = useNavigate();
   const { setCart } = useContext(PetContext);

   useEffect(() => {
      const fetchData = async () => {
         try {
            await Axios.get(`/api/users/payment/success`);
            toast.success("Payment successful");
            setCart([])
            setTimeout(() => {
               navigate("/");
            }, 3000);
         } catch (error) {
            toast.error(error.response.data.message);
            navigate("/");
         }
      };

      fetchData();
   }, [navigate, setCart]);

   return (
      <div className="payment-success">
         <img
            src="https://assets.materialup.com/uploads/9ba2d687-d7d3-4361-8aee-7b2a3c074761/preview.gif"
            alt="Success"
         />
      </div>
   );
}
