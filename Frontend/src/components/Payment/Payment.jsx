import React, { useState } from 'react';
import './Payment.css';  

function Payment() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    address: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call the backend to create an order
    const response = await fetch('http://localhost:3000/createOrder', {
      method: 'POST',   
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: 100 }),
    });

    const order = await response.json();

    // Initialize Razorpay
    const options = {
      key: "rzp_test_qou4YauYTXCG9k",
      amount: order.amount,
      currency: 'INR',
      name: 'Your Company Name',
      description: 'Test Transaction',
      image: 'https://your-logo-url.com',
      order_id: order.id,
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
        // Handle successful payment here
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.contact,
      },
      notes: {
        address: formData.address,
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response) {
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
    <div className="payment-page">
      <h2>Payment Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Contact</label>
          <input type="tel" name="contact" value={formData.contact} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Address</label>
          <textarea name="address" value={formData.address} onChange={handleChange} required></textarea>
        </div>
        <button type="submit" className="btnPay">Proceed to Pay</button>
      </form>
    </div>
  );
}

export default Payment;
