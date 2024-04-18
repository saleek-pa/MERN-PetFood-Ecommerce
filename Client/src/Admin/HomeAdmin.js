import React, { useContext, useEffect, useState } from 'react';
import { axios } from '../Utils/Axios';
import { MDBIcon } from 'mdb-react-ui-kit';
import { PetContext } from '../Context/Context';
import toast from 'react-hot-toast';

export default function HomeDashboard() {
  const { products, handlePrice } = useContext(PetContext);
  const [stats, setStats] = useState([{ totalProductsSold: '', totalRevenue: '' }]);
  const [profile, setProfile] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, statsResponse, orderResponse] = await Promise.all([
          axios.get('/api/admin/users'),
          axios.get('/api/admin/stats'),
          axios.get('/api/admin/orders'),
        ]);

        if (statsResponse.status === 200) setStats(statsResponse.data.data);
        if (orderResponse.status === 200) setOrders(orderResponse.data.data);
        if (usersResponse.status === 200) setProfile(usersResponse.data.data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchData();
  }, [setProfile, setStats]);

  // Reverse product details and user profiles for display as recent
  const reversedData = [...products].reverse();
  const reversedProfile = [...profile].reverse();

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center gap-5 mb-5">
        <div className="content-box">
          <h6>Total Orders</h6>
          <h2>{orders ? orders.length : 0}</h2>
          <p className="text-success">
            <MDBIcon fas icon="chart-line" className="me-2" />
            {Math.round(Math.random() * 100) / 10}% <span className="text-muted"> Last Month</span>
          </p>
        </div>

        <div className="content-box">
          <h6>Total Revenue</h6>
          <h2>{stats[0] ? handlePrice(stats[0].totalRevenue) : 0}</h2>
          <p className="text-success">
            <MDBIcon fas icon="chart-line" className="me-2" />
            {Math.round(Math.random() * 100) / 10}% <span className="text-muted"> Last Month</span>
          </p>
        </div>

        <div className="content-box">
          <h6>Total Products Sold</h6>
          <h2>{stats[0] ? stats[0].totalProductsSold : 0}</h2>

          <p className="text-success">
            <MDBIcon fas icon="chart-line" className="me-2" />
            {Math.round(Math.random() * 100) / 10}% <span className="text-muted"> Last Month</span>
          </p>
        </div>
      </div>

      <div className="dashboard-recent d-flex justify-content-center">
        <div className="dashboard-table recent-admin ps-5">
          <h4>New Products</h4>
          <table>
            <thead>
              <tr>
                <td>Category</td>
                <td>Name</td>
                <td>Price</td>
              </tr>
            </thead>
            {reversedData.map((product) => (
              <tbody key={product._id}>
                <tr>
                  <th className="text-center">{product.category}</th>
                  <th>{product.title.slice(0, 24)}</th>
                  <th>{handlePrice(product.price)}</th>
                </tr>
              </tbody>
            ))}
          </table>
        </div>

        <div className="dashboard-table recent-admin ps-5">
          <h4>Recent Users</h4>
          <table>
            <thead>
              <tr>
                <td>Name</td>
                <td>Email</td>
              </tr>
            </thead>
            {reversedProfile.map((user) => (
              <tbody key={user._id}>
                <tr>
                  <th>{user.name.split(' ')[0]}</th>
                  <th>{user.email}</th>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}
