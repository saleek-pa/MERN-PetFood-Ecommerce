import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MDBBtn } from "mdb-react-ui-kit";
import { Axios } from "../App";
import toast from "react-hot-toast";

export default function UsersAdmin() {
   const navigate = useNavigate();
   const [profile, setProfile] = useState([]);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await Axios.get("/api/admin/users");
            setProfile(response.data.data);
         } catch (error) {
            toast.error(error.response.data.message);
         }
      };

      fetchData();
   }, [setProfile]);

   return (
      <div>
         <div className="users-admin px-5 py-3">
            <table>
               <thead>
                  <tr>
                     <td>ID</td>
                     <td>Full Name</td>
                     <td>Email</td>
                     <td className="ps-0">Orders</td>
                     <td></td>
                  </tr>
               </thead>
               <tbody>
                  {profile.map((user) => (
                     <tr key={user._id}>
                        <th>{user._id.slice(-5)}</th>
                        <th>{user.name}</th>
                        <th>{user.email}</th>
                        <th>{user.orders.length}</th>
                        <th className="pe-0">
                           <MDBBtn
                              className="me-1"
                              color="info"
                              rounded
                              onClick={() => navigate(`/dashboard/users/${user._id}`)}
                           >
                              More Info
                           </MDBBtn>
                        </th>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
}
