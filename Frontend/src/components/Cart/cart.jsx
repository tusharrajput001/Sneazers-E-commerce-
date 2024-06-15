// src/components/Cart/Cart.js
import React from 'react';
import { useCart } from '../../Contexts/CartContext';
import './cart.css'; // Ensure the correct path to the CSS file

function Cart() {
  const { cart, removeFromCart } = useCart();

  if (cart.length === 0) {
    return <div className="cart-empty">Your cart is empty.</div>;
  }

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item._id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p>{item.brand}</p>
              <p className="cart-item-price">₹ {item.price}</p>
              <button onClick={() => handleRemoveFromCart(item._id)} className="btn remove-from-cart">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;
