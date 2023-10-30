import React, { createContext, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ProductData } from "./Pages/ProductData";
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

export const PetContext = createContext();

function App() {
  const [cart, setCart] = useState([]);
  const [loginStatus, setLoginStatus] = useState(false);
  const [name, setName] = useState("");
  const [productDetails, setProductDetails] = useState(ProductData);
  const [productId, setProductId] = useState(17);
  const [orderId, setOrderId] = useState(11);
  const [profile, setProfile] = useState([
    {
      id: "0",
      name: "AdminX",
      email: "admin@gmail.com",
      password: "321",
      role: "admin",
    },
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      password: "1",
      orders: [
        {
          orderId: 1,
          product: "Pedigree Chicken & Vegetables Adult Dog Dry Food",
          quantity: Math.ceil(Math.random() * 5),
          price: 284,
        },
        {
          orderId: 2,
          product: "Drools Focus Super Premium Adult Dry Dog Food",
          quantity: Math.ceil(Math.random() * 5),
          price: 534,
        },
      ],
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      password: "securePassword",
      orders: [
        {
          orderId: 3,
          product: "Royal Canin Maxi Puppy Dog Dry Food (2-15 months)",
          quantity: Math.ceil(Math.random() * 5),
          price: 855,
        },
        {
          orderId: 4,
          product: "Drools | 100% Vegetarian Adult Dog Dry Food",
          quantity: Math.ceil(Math.random() * 5),
          price: 645,
        },
      ],
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      password: "mySecretPass",
      orders: [
        {
          orderId: 5,
          product: "Sheba Chicken Flavour Cat Dry Food",
          quantity: Math.ceil(Math.random() * 5),
          price: 1156,
        },
      ],
    },
    {
      id: 4,
      name: "Bob Wilson",
      email: "bob.wilson@example.com",
      password: "topSecret123",
      orders: [
        {
          orderId: 6,
          product: "Royal Canin Kitten Gravy Wet Food",
          quantity: Math.ceil(Math.random() * 5),
          price: 489,
        },
      ],
    },
    {
      id: 5,
      name: "Eva Brown",
      email: "eva.brown@example.com",
      password: "superSecurePwd",
      orders: [],
    },
    {
      id: 6,
      name: "David Lee",
      email: "david.lee@example.com",
      password: "davidPass123",
      orders: [
        {
          orderId: 7,
          product: "Purina Felix Tuna with Jelly Kitten Wet Food",
          quantity: Math.ceil(Math.random() * 5),
          price: 594,
        },
        {
          orderId: 8,
          product: "Royal Canin Fit 32 Adult Cat Dry Food",
          quantity: Math.ceil(Math.random() * 5),
          price: 2975,
        },
      ],
    },
    {
      id: 7,
      name: "Olivia Taylor",
      email: "olivia.taylor@example.com",
      password: "oliviaPassword",
      orders: [
        {
          orderId: 9,
          product:
            "Farmina N&D Chicken & Pomegranate Ancestral Grain Selection",
          quantity: Math.ceil(Math.random() * 5),
          price: 475,
        },
      ],
    },
    {
      id: 8,
      name: "Michael White",
      email: "michael.white@example.com",
      password: "michaelPass",
      orders: [],
    },
    {
      id: 9,
      name: "Sophia Adams",
      email: "sophia.adams@example.com",
      password: "sophiaSecure123",
      orders: [],
    },
    {
      id: 10,
      name: "William Turner",
      email: "william.turner@example.com",
      password: "william12345",
      orders: [
        {
          orderId: 10,
          product: "SuperCoat Chicken Adult All Breed Dog Dry Food",
          quantity: Math.ceil(Math.random() * 5),
          price: 760,
        },
      ],
    },
  ]);

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
          profile,
          setProfile,
          productDetails,
          setProductDetails,
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
