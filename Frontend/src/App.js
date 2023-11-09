import React, { createContext, useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Registration from "./Pages/Registration";
import AllProducts from "./Pages/AllProducts";
import Navbar from "./Pages/Navbar";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Footer from "./Pages/Footer";
import Orders from "./Pages/Orders";
import DogFood from "./Pages/DogFood";
import CatFood from "./Pages/CatFood";
import Details from "./Pages/Details";
import Wishlist from "./Pages/Wishlist";
import FixedAdmin from "./Admin/FixedAdmin";
import SuccessPayment from "./Pages/SuccessPayment";
import axios from "axios";

export const PetContext = createContext();

function App() {
   const [cart, setCart] = useState([]);
   const [wishlist, setWishlist] = useState([]);
   const [tokenConfig, setTokenConfig] = useState({});
   const [loginStatus, setLoginStatus] = useState(false);
   const [productDetails, setProductDetails] = useState([]);
   const userID = localStorage.getItem("userID");

   useEffect(() => {
      const token = localStorage.getItem("jwt_token");

      if (token) {
         setLoginStatus(true);
         setTokenConfig({ headers: { Authorization: `Bearer ${token}` } });
      } else {
         setLoginStatus(false);
      }

      const fetchData = async () => {
         try {
            const response = await axios.get("http://localhost:8000/api/users/products");
            if (response.status === 200) setProductDetails(response.data.data);
         } catch (error) {
            toast.error(error.response.data.message);
         }
      };
      fetchData();
   }, [setTokenConfig]);

   const FetchWishlist = (loginStatus, userID, setWishlist, tokenConfig) => {
      useEffect(() => {
         const fetchData = async () => {
            try {
               if (loginStatus) {
                  const tokenConfig = { headers: { Authorization: `Bearer ${localStorage.getItem("jwt_token")}` } };
                  const response = await axios.get(`http://localhost:8000/api/users/${userID}/wishlist`, tokenConfig);
                  if (response.status === 200) setWishlist(response.data.data);
               }
            } catch (error) {
               toast.error(error.response.data.message);
            }
         };

         fetchData();
      }, [loginStatus, userID, setWishlist, tokenConfig]);
   };

   const FetchCart = (loginStatus, userID, setCart, tokenConfig) => {
      useEffect(() => {
         const fetchData = async () => {
            try {
               if (loginStatus) {
                  const tokenConfig = { headers: { Authorization: `Bearer ${localStorage.getItem("jwt_token")}` } };
                  const response = await axios.get(`http://localhost:8000/api/users/${userID}/cart`, tokenConfig);
                  if (response.status === 200) setCart(response.data.data);
               }
            } catch (error) {
               toast.error(error.response.data.message);
            }
         };

         fetchData();
      }, [loginStatus, userID, setCart, tokenConfig]);
   };

   const addToWishlist = async (productID) => {
      try {
         await axios.post(`http://localhost:8000/api/users/${userID}/wishlist`, { productID }, tokenConfig);
         const response = await axios.get(`http://localhost:8000/api/users/${userID}/wishlist`, tokenConfig);
         if (response.status === 200) {
            toast.success("Added to wishlist");
            setWishlist(response.data.data);
         }
      } catch (error) {
         toast.error(error.response.data.message);
      }
   };

   const removeFromWishlist = async (productID) => {
      try {
         await axios.delete(`http://localhost:8000/api/users/${userID}/wishlist/${productID}`, tokenConfig);
         const response = await axios.get(`http://localhost:8000/api/users/${userID}/wishlist`, tokenConfig);
         if (response.status === 200) {
            toast.success("Removed from wishlist");
            setWishlist(response.data.data);
         }
      } catch (error) {
         toast.error(error.response.data.message);
      }
   };

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
               tokenConfig,
               userID,
               loginStatus,
               setLoginStatus,
               FetchWishlist,
               productDetails,
               setProductDetails,
               wishlist,
               setWishlist,
               addToWishlist,
               removeFromWishlist,
               FetchCart,
               cart,
               setCart,
               handlePrice,
            }}
         >
            {/* Navbar & Footer is common for every route except Dashboard */}
            {!isDashboardRoute && <Navbar />}
            <Toaster />
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/registration" element={<Registration />} />
               <Route path="/login" element={<Login />} />
               <Route path="/cart" element={<Cart />} />
               <Route path="/dog-food" element={<DogFood />} />
               <Route path="/cat-food" element={<CatFood />} />
               <Route path="/wishlist" element={<Wishlist />} />
               <Route path="/products" element={<AllProducts />} />
               <Route path="/products/:id" element={<Details />} />
               <Route path="/dog-food/:id" element={<Details />} />
               <Route path="/cat-food/:id" element={<Details />} />
               <Route path="/payment/success" element={<SuccessPayment />} />
               <Route path="/orders" element={<Orders />} />
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
