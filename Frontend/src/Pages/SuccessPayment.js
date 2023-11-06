import React, { useEffect } from "react";
import axios from "axios";

export const SuccessPayment = () => {
   useEffect(() => {
      const fetchData = async () => {
         try {
            await axios.get(`http://localhost:8000/api/users/payment/success`);
         } catch (error) {
            alert(error.response.data.message);
         }
      };

      fetchData();
   }, []);

   return (
      <div>
         <img
            src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.uplabs.com%2Fposts%2Fsuccess-transition&psig=AOvVaw2cI0093QVLgSpeXG_-me-5&ust=1699351650897000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKj0h6yQr4IDFQAAAAAdAAAAABAE"
            alt="Success"
         />
      </div>
   );
};
