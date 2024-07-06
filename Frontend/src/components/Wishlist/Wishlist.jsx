import React from 'react';
import { useWishlist } from '../../Contexts/WishlistContext';
import ProductCard from '../ProductCard/productCard';
import EmptyWishlist from "../../../public/wishlist.svg";
import './Wishlist.css';

function Wishlist() {
  const { wishlist } = useWishlist();

  return (
    <div className="wishlist-page">
      <h1>Wishlist</h1>
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
    </div>
  );
}

export default Wishlist;
