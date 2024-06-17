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
    return cart.reduce((total, item) => {
      const priceWithoutCommas = parseFloat(item.price.replace(/,/g, ''));
      return total + priceWithoutCommas * item.quantity;
    }, 0);
  };

  const handleCheckout = async () => {
    const totalAmount = calculateTotalAmount();

    const response = await fetch('http://localhost:3000/createOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: totalAmount }),
    });

    const order = await response.json();

    var options = {
      key: "rzp_test_qou4YauYTXCG9k",
      amount: order.amount,
      currency: "INR",
      name: "Your Company Name",
      description: "Test Transaction",
      image: "https://your-logo-url.com",
      order_id: order.id,
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
        // Here you can call another backend API to verify the payment and complete the order
      },
      prefill: {
        name: "Your Name",
        email: "your-email@example.com",
        contact: "9999999999"
      },
      notes: {
        address: "Your Company Address"
      },
      theme: {
        color: "#3399cc"
      }
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response){
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });

    rzp1.open();
  };

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Your Cart</h2>
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
            <h3>Total Amount:</h3>
            <p>₹ {calculateTotalAmount()}</p>
          </div>
          <div className="checkoutBtn">
            <button onClick={handleCheckout}>Checkout</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
