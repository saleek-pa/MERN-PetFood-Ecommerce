import React, { useContext } from "react";
import { PetContext } from "../App";
import { useNavigate } from "react-router-dom";
import { MDBBtn } from "mdb-react-ui-kit";

export default function UsersAdmin() {
  const { profile } = useContext(PetContext);
  const navigate = useNavigate();
  const finalProfile = profile.filter((user) => user.role !== "admin");

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
            {finalProfile.map((user) => (
              <tr key={user.id}>
                <th>{user.id}</th>
                <th>{user.name}</th>
                <th>{user.email}</th>
                <th>{user.orders.length}</th>
                <th className="pe-0">
                  <MDBBtn
                    className="me-1"
                    color="info"
                    rounded
                    onClick={() => navigate(`/dashboard/users/${user.id}`)}
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
