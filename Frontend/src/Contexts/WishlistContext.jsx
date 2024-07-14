import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export const useWishlist = () => {
  return useContext(WishlistContext);
};

export const WishlistProvider = ({ children, userId }) => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, [userId]);

  const fetchWishlist = async () => {
    try {
      const response = await axios.get(`https://sneazers-e-commerce.vercel.app/api/wishlist/${userId}`);
      setWishlist(response.data.products || []);
    } catch (err) {
      console.error('Error fetching wishlist:', err);
    }
  };

  const addToWishlist = async (product) => {
    try {
      await axios.post(`https://sneazers-e-commerce.vercel.app/api/wishlist/${userId}`, { productId: product._id });
      setWishlist((prevWishlist) => [...prevWishlist, product]);
    } catch (err) {
      console.error('Error adding to wishlist:', err);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(`https://sneazers-e-commerce.vercel.app/api/wishlist/${userId}/${productId}`);
      setWishlist((prevWishlist) =>
        prevWishlist.filter((item) => item._id !== productId)
      );
    } catch (err) {
      console.error('Error removing from wishlist:', err);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
