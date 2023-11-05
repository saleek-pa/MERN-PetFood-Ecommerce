import React, { createContext, useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Registration from "./Pages/Registration";
import AllProducts from "./Pages/AllProducts";
import Navbar from "./Pages/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";
import Footer from "./Pages/Footer";
import DogFood from "./Pages/DogFood";
import CatFood from "./Pages/CatFood";
import Details from "./Pages/Details";
import FixedAdmin from "./Admin/FixedAdmin";
import axios from "axios";
import Wishlist from "./Pages/Wishlist";

export const PetContext = createContext();

function App() {
   const [cart, setCart] = useState([]);
   const [loginStatus, setLoginStatus] = useState(false);
   const [name, setName] = useState("");
   const [userID, setUserID] = useState(null);
   const [productDetails, setProductDetails] = useState([]);
   const [wishlist, setWishlist] = useState([]);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.get("http://localhost:8000/api/users/products");
            if (response.status === 200) {
               setProductDetails(response.data.data);
            }
         } catch (error) {
            alert(error.response.data.message);
         }
      };

      fetchData();
   }, []);

   const [productId, setProductId] = useState(17);
   const [orderId, setOrderId] = useState(11);

   // Function to format a price (₹1,000, ₹10,000)
   const handlePrice = (price) => {
      const formattedPrice = Number(price).toLocaleString("en-IN");
      return "₹" + formattedPrice;
   };

   // Check if the current route is within the dashboard
   const location = useLocation();
   const isDashboardRoute = location.pathname.startsWith("/dashboard");

   return (
      <>
         <PetContext.Provider
            value={{
               loginStatus,
               setLoginStatus,
               name,
               setName,
               userID,
               setUserID,
               productDetails,
               setProductDetails,
               wishlist,
               setWishlist,
               cart,
               setCart,
               handlePrice,
               productId,
               setProductId,
               orderId,
               setOrderId,
            }}
         >
            {/* Navbar & Footer is common for every route except Dashboard */}
            {!isDashboardRoute && <Navbar />}
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/registration" element={<Registration />} />
               <Route path="/login" element={<Login />} />
               <Route path="/cart" element={<Cart />} />
               <Route path="/products" element={<AllProducts />} />
               <Route path="/dog-food" element={<DogFood />} />
               <Route path="/cat-food" element={<CatFood />} />
               <Route path="/wishlist" element={<Wishlist />} />
               <Route path="/products/:id" element={<Details />} />
               <Route path="/dog-food/:id" element={<Details />} />
               <Route path="/cat-food/:id" element={<Details />} />
               <Route path="/dashboard" element={<FixedAdmin />} />
               <Route path="/dashboard/users" element={<FixedAdmin />} />
               <Route path="/dashboard/users/:id" element={<FixedAdmin />} />
               <Route path="/dashboard/products" element={<FixedAdmin />} />
               <Route path="/dashboard/products/:id" element={<FixedAdmin />} />
               <Route path="/dashboard/add-products" element={<FixedAdmin />} />
            </Routes>
            {!isDashboardRoute && <Footer />}
         </PetContext.Provider>
      </>
   );
}

export default App;
