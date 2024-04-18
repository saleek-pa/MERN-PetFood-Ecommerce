import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axios } from '../Utils/Axios';
import toast from 'react-hot-toast';

const PetContext = createContext();

const PetProvider = ({ children }) => {
  const userID = localStorage.getItem('userID');
  const [products, setProducts] = useState([]);
  const [loginStatus, setLoginStatus] = useState(userID ? true : false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/users/products');
        setProducts(response.data.data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchData();
  }, []);

  const fetchCatFood = async () => {
    try {
      const response = await axios.get('/api/users/products/category/Cat');
      return response.data.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const fetchDogFood = async () => {
    try {
      const response = await axios.get('/api/users/products/category/Dog');
      return response.data.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const fetchProductDetails = async (id) => {
    try {
      const response = await axios.get(`/api/users/products/${id}`);
      return response.data.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await axios.get(`/api/users/${userID}/cart`);
      setCart(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const addToCart = async (productID) => {
    try {
      await axios.post(`/api/users/${userID}/cart`, { productID });
      const response = await axios.get(`/api/users/${userID}/cart`);
      setCart(response.data.data);
      toast.success('Added to cart');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Remove an item from the cart
  const removeFromCart = async (productID) => {
    try {
      await axios.delete(`/api/users/${userID}/cart/${productID}`);
      const response = await axios.get(`/api/users/${userID}/cart`);
      setCart(response.data.data);
      toast.success('Removed from cart');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Handle changes in item quantity
  const handleQuantity = async (cartID, quantityChange) => {
    const data = { id: cartID, quantityChange };
    try {
      await axios.put(`/api/users/${userID}/cart`, data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const fetchWishlist = async () => {
    try {
      if (loginStatus) {
        const response = await axios.get(`/api/users/${userID}/wishlist`);
        setWishlist(response.data.data);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const addToWishlist = async (productID) => {
    try {
      await axios.post(`/api/users/${userID}/wishlist`, { productID });
      const response = await axios.get(`/api/users/${userID}/wishlist`);
      toast.success('Added to wishlist');
      setWishlist(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const removeFromWishlist = async (productID) => {
    try {
      await axios.delete(`/api/users/${userID}/wishlist/${productID}`);
      const response = await axios.get(`/api/users/${userID}/wishlist`);
      toast.success('Removed from wishlist');
      setWishlist(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Function to format a price (₹1,000, ₹10,000)
  const handlePrice = (price) => `₹${Number(price).toLocaleString('en-IN')}`;

  //  Calculate the total price of items in the cart
  const totalPrice = cart?.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Handle the checkout process
  const handleCheckout = async () => {
    try {
      const response = await axios.post(`/api/users/${userID}/payment`);
      const url = response.data.url;
      const confirmation = window.confirm('You are being redirected to the Stripe payment gateway. Continue?');
      if (confirmation) window.location.replace(url);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const fetchPaymentStatus = async () => {
    try {
      await axios.get(`/api/users/payment/success`);
      setCart([]);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      toast.error(error.response.data.message);
      navigate('/');
    }
  };

  return (
    <PetContext.Provider
      value={{
        products,
        fetchProductDetails,
        fetchCatFood,
        fetchDogFood,
        fetchCart,
        addToCart,
        removeFromCart,
        handleQuantity,
        cart,
        loginStatus,
        setLoginStatus,
        fetchWishlist,
        addToWishlist,
        removeFromWishlist,
        wishlist,
        handlePrice,
        totalPrice,
        handleCheckout,
        fetchPaymentStatus,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export { PetContext, PetProvider };
