import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PetContext } from "../App";
import { MDBIcon } from "mdb-react-ui-kit";
import axios from "axios";

export default function UserDetailsAdmin() {
   const { id } = useParams();
   const [user, setUser] = useState({ orders: [] });
   const { handlePrice } = useContext(PetContext);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.get(`http://localhost:8000/api/admin/users/${id}`);
            if (response.status === 200) {
               setUser(response.data.data);
            }
         } catch (error) {
            alert(error.response.data.message);
         }
      };

      fetchData();
   }, [id]);

   return (
      <div className="d-flex flex-column align-items-center pt-3">
         <div className="d-flex align-items-center gap-3">
            <MDBIcon fas icon="user-circle" className="text-muted" style={{ fontSize: "100px" }} />
            <div className="d-flex flex-column">
               <h3>{user.name}</h3>
               <h6>{user.email}</h6>
            </div>
         </div>
         <div className="dashboard-table mt-4 user-details-admin px-5">
            <table className="w-100">
               <thead className="text-center">
                  <tr>
                     <td>Order ID</td>
                     <td>Product Name</td>
                     <td>Unit Price</td>
                     <td>Quantity</td>
                     <td>Total Price</td>
                  </tr>
               </thead>
               <tbody className="text-center">
                  {user.orders.length > 0 ? (
                     user.orders.map((order, index) => (
                        <tr key={order.order_id}>
                           <th>{order.order_id}</th>
                           <th>{order.products}</th>
                           <th>{order.total_amount}</th>
                           <th>{order.quantity}</th>
                           {index === 0 && (
                              <th rowSpan={user.orders.length}>
                                 {handlePrice(
                                    user.orders.reduce((total, order) => total + order.price * order.quantity, 0)
                                 )}
                              </th>
                           )}
                        </tr>
                     ))
                  ) : (
                     <tr>
                        <td colSpan="5">
                           <h3>No Orders</h3>
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>
   );
}
