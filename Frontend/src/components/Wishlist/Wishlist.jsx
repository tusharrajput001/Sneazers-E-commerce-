import React from 'react';
import { useWishlist } from '../../Contexts/WishlistContext';
import ProductCard from '../ProductCard/productCard';
import './Wishlist.css';

function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="wishlist-page">
      <h1 style={{textAlign:'center'}}>Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>No items in wishlist.</p>
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
              {/* <button onClick={() => removeFromWishlist(product._id)}>Remove</button> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
