import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../Contexts/CartContext';
import emptyCartImage from '../../assets/empty-cart.svg'; // Import your empty cart illustration
import './cart.css';

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h1 style={{ textAlign: 'center', marginTop: '20px' }}>My Cart</h1>
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

  const calculateGST = (amount) => {
    return amount * 0.18;
  };

  const handleCheckout = () => {
    const totalAmount = calculateTotalAmount();
    const gst = calculateGST(totalAmount);
    const shippingCharges = 99;
    const finalAmount = totalAmount + gst + shippingCharges;

    navigate('/payment', { state: { totalAmount: finalAmount * 100 } }); // Convert to paisa
  };

  const totalAmount = calculateTotalAmount();
  const gst = calculateGST(totalAmount);
  const shippingCharges = 99;
  const finalAmount = totalAmount + gst + shippingCharges;

  return (
    <>
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>My Cart</h1>
      <div className="cart-page">
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
        <div className="cart-summary">
          <div className="cart-total">
            <h3>Total Amount: <span>₹ {totalAmount.toFixed(2)}</span></h3>
            <h3>GST (18%): <span>₹ {gst.toFixed(2)}</span></h3>
            <h3>Shipping Charges: <span>₹ {shippingCharges.toFixed(2)}</span></h3>
            <h3><strong>Final Amount: <span>₹ {finalAmount.toFixed(2)}</span></strong></h3>
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
