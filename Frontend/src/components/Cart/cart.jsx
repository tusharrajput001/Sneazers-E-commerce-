import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../Contexts/CartContext';
import emptyCartImage from '../../../public/empty-cart.svg'; // Import your empty cart illustration
import './cart.css';

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();


  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h1 style={{ textAlign: 'center' , marginTop:'20px'}}>My Cart</h1>
        <img src={emptyCartImage} alt="Empty Cart" className="empty-cart-image" />
        <p>Your cart is empty.</p>
      </div>
    );
  }

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const priceWithoutCommas = parseFloat(item.price.replace(/,/g, ''));
      return total + priceWithoutCommas * item.quantity;
    }, 0);
  };

  const handleCheckout = () => {
    const totalAmountPaisa = Math.round(calculateTotalAmount() * 100); // Convert to paisa and round
    navigate('/payment', { state: { totalAmount: totalAmountPaisa } });
  };

  return (
    <>
      
      <h1 style={{ textAlign: 'center', marginTop:'20px'}}>My Cart</h1>
      <div className="cart-page">
        {cart.length > 0 && (
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item._id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>{item.brand}</p>
                  <p className="cart-item-price">₹ {item.price}</p>
                  <p className="cart-item-size">Size: {item.selectedSize}</p>
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
        )}
        <div className="cart-summary">
          <div className="cart-total">
            <h3>Total Amount:</h3>
            <p>₹ {calculateTotalAmount()}</p>
          </div>
          <div className="checkoutBtn">
            <button onClick={handleCheckout}>Proceed to Buy</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
