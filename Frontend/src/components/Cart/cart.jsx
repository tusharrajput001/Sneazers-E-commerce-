import React from 'react';
import { useCart } from '../../Contexts/CartContext';
import './cart.css';

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  if (cart.length === 0) {
    return <div className="cart-empty">Your cart is empty.</div>;
  }

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const calculateTotalAmount = () => {
    // Remove commas from prices and calculate total
    return cart.reduce((total, item) => {
      const priceWithoutCommas = parseFloat(item.price.replace(/,/g, ''));
      return total + priceWithoutCommas * item.quantity;
    }, 0);
  };
  return (
    <>
          <h2 style={{textAlign:'center'}}>Your Cart</h2>
    <div className="cart-page">

      <div className="cart-items">
        {cart.map((item) => (
          <div key={item._id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p>{item.brand}</p>
              <p className="cart-item-price">₹ {item.price}</p>
              <div className="cart-item-quantity">
                <button onClick={() => handleQuantityChange(item._id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item._id, item.quantity + 1)}>+</button>
              </div>
              <button onClick={() => handleRemoveFromCart(item._id)} className="btn remove-from-cart">Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <div className="cart-total">
          <h3>Total Amount:</h3>
          <p>₹ {calculateTotalAmount()}</p>
        </div>
      </div>
    </div>
    </>
  );
}

export default Cart;
