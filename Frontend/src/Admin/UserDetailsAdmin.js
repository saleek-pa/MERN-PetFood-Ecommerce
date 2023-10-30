import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { PetContext } from "../App";
import { MDBIcon } from "mdb-react-ui-kit";

export default function UserDetailsAdmin() {
  const { id } = useParams();
  const { profile, handlePrice } = useContext(PetContext);
  const finalProfile = profile.filter((user) => user.role !== "admin");
  const user = finalProfile.find((user) => user.id === parseInt(id));

  return (
    <div className="d-flex flex-column align-items-center pt-3">
      <div className="d-flex align-items-center gap-3">
        <MDBIcon
          fas
          icon="user-circle"
          className="text-muted"
          style={{ fontSize: "100px" }}
        />
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
            {user.orders.map((order, index) => (
              <tr key={order.orderId}>
                <th>{order.orderId}</th>
                <th>{order.product}</th>
                <th>{order.price}</th>
                <th>{order.quantity}</th>
                {index === 0 && (
                  <th rowSpan={user.orders.length}>
                    {handlePrice(
                      user.orders.reduce(
                        (total, order) => total + order.price * order.quantity,
                        0
                      )
                    )}
                  </th>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
