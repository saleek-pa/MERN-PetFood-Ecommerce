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

export const Axios = axios.create({
   baseURL: process.env.REACT_APP_BASE_URL,
   headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
   },
});


function App() {
   const [cart, setCart] = useState([]);
   const [wishlist, setWishlist] = useState([]);
   const [loginStatus, setLoginStatus] = useState(false);
   const [productDetails, setProductDetails] = useState([]);
   const userID = localStorage.getItem("userID");


   useEffect(() => {
      const token = localStorage.getItem("jwt_token");
      token ? setLoginStatus(true) : setLoginStatus(false);

      const fetchData = async () => {
         try {
            const response = await Axios.get("/api/users/products");
            setProductDetails(response.data.data);
         } catch (error) {
            toast.error(error.response.data.message);
         }
      };
      fetchData();
   }, []);


   const FetchWishlist = (loginStatus, userID, setWishlist) => {
      useEffect(() => {
         const fetchData = async () => {
            try {
               if (loginStatus) {
                  const response = await Axios.get(`/api/users/${userID}/wishlist`);
                  setWishlist(response.data.data);
               }
            } catch (error) {
               toast.error(error.response.data.message);
            }
         };

         fetchData();
      }, [loginStatus, userID, setWishlist]);
   };


   const FetchCart = (loginStatus, userID, setCart) => {
      useEffect(() => {
         const fetchData = async () => {
            try {
               if (loginStatus) {
                  const response = await Axios.get(`/api/users/${userID}/cart`);
                  setCart(response.data.data);
               }
            } catch (error) {
               toast.error(error.response.data.message);
            }
         };
         fetchData();
      }, [loginStatus, userID, setCart]);
   };


   const addToWishlist = async (productID) => {
      try {
         await Axios.post(`/api/users/${userID}/wishlist`, { productID });
         const response = await Axios.get(`/api/users/${userID}/wishlist`);
         toast.success("Added to wishlist");
         setWishlist(response.data.data);
      } catch (error) {
         toast.error(error.response.data.message);
      }
   };


   const removeFromWishlist = async (productID) => {
      try {
         await Axios.delete(`/api/users/${userID}/wishlist/${productID}`);
         const response = await Axios.get(`/api/users/${userID}/wishlist`);
         toast.success("Removed from wishlist");
         setWishlist(response.data.data);
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
               userID, loginStatus, setLoginStatus, FetchWishlist,
               productDetails, setProductDetails, wishlist,
               setWishlist, addToWishlist, removeFromWishlist,
               FetchCart, cart, setCart, handlePrice,
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
