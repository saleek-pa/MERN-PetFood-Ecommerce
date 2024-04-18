import React, { useContext, useEffect, useState } from 'react';
import { PetContext } from '../Context/Context';
import { useParams } from 'react-router-dom';
import { MDBIcon } from 'mdb-react-ui-kit';
import { axios } from '../Utils/Axios';
import toast from 'react-hot-toast';

export default function UserDetailsAdmin() {
  const { id } = useParams();
  const [user, setUser] = useState({ orders: [] });
  const { handlePrice } = useContext(PetContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/admin/users/${id}`);
        setUser(response.data.data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="d-flex flex-column align-items-center pt-3">
      <div className="d-flex align-items-center gap-3">
        <MDBIcon fas icon="user-circle" className="text-muted" style={{ fontSize: '100px' }} />
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
              <td>Date</td>
              <td>Product Name</td>
              <td>Payment ID</td>
              <td>Total Price</td>
            </tr>
          </thead>
          <tbody className="text-center">
            {user.orders.length > 0 ? (
              user.orders.map((order, index) => (
                <React.Fragment key={order._id}>
                  <tr>
                    <th rowSpan={order.products.length}>{order.order_id.slice(-10)}</th>
                    <th rowSpan={order.products.length}>{order.date}</th>
                    <th>{order.products[0].title}</th>
                    <th rowSpan={order.products.length}>{order.payment_id.slice(-10)}</th>
                    <th rowSpan={order.products.length}>{handlePrice(order.total_amount)}</th>
                  </tr>
                  {order.products.slice(1).map((product) => (
                    <tr key={product._id}>
                      <th>{product.title}</th>
                    </tr>
                  ))}
                </React.Fragment>
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
