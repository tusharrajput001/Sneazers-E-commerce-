import React, { useState, useEffect } from 'react';
import { useWishlist } from '../../Contexts/WishlistContext';
import ProductCard from '../ProductCard/productCard';
import EmptyWishlist from "../../assets/wishlist.svg";
import Loader from '../Loader/Loader'; // Assuming you have a Loader component
import './Wishlist.css';

function Wishlist() {
  const { wishlist } = useWishlist();
  const [loading, setLoading] = useState(true); // State to track loading state

  useEffect(() => {
    // Simulate loading delay for demonstration (replace with actual fetch logic)
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulating 2 seconds loading time
  }, []); // Run effect once on component mount

  return (
    <div className="wishlist-page">
      <h1>Wishlist</h1>
      {loading ? (
        <Loader /> // Show loader while loading
      ) : (
        <>
          {wishlist.length === 0 ? (
            <div className='empty-wishlist'>
              <img src={EmptyWishlist} alt="Empty Wishlist" className="empty-wishlist-image" />
              <p>No items in wishlist.</p>
            </div>
          ) : (
            <div className="wishlist-list">
              {wishlist.map((product) => (
                <div key={product._id} className="wishlist-item">
                  <ProductCard
                    id={product._id}
                    image={product.image}
                    image2={product.image2}
                    brand={product.brand}
                    name={product.name}
                    price={product.price}
                  />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Wishlist;
