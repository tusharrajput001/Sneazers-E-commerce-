import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext"; // Import useAuth to get currentUser
import { useCart } from "../../Contexts/CartContext";
import "./Payment.css";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = localStorage.getItem("_id");
  const { cart, clearCart } = useCart();
  const { currentUser } = useAuth(); // Get the current user from AuthContext
  const totalAmount = location.state?.totalAmount || 0;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the backend to create an order
      const response = await fetch("http://localhost:3000/createOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: totalAmount }), // Ensure amount is correctly formatted in paisa
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const order = await response.json();

      // Initialize Razorpay
      const options = {
        key: "rzp_test_qou4YauYTXCG9k",
        amount: order.amount,
        currency: "INR",
        name: "Sneazers Ltd.",
        description: "Transaction",
        image: "",
        order_id: order.id,
        handler: async function (response) {
          // Handle successful payment here
          await createOrderInBackend(order.id); // Pass order.id to backend
          clearCart(); // Clear cart after successful payment
          navigate(`/orders/${userId}`);
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
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });

      rzp1.open();
    } catch (error) {
      console.error("Payment failed:", error);
      // Handle error appropriately (e.g., show error message to user)
    }
  };

  const createOrderInBackend = async (orderId) => {
    try {
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: localStorage.getItem('_id'), // Use the currentUser ID from context
          items: cart.map(item => ({ productId: item._id, quantity: item.quantity })),
          totalAmount,
          orderId: orderId, // Pass the order ID from Razorpay
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create order in backend");
      }
    } catch (error) {
      console.error("Failed to create order in backend:", error);
    }
  };

  return (
    <div className="payment-page">
      <h2>Payment Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Contact</label>
          <input
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btnPay">
          Proceed to Pay
        </button>
      </form>
    </div>
  );
}

export default Payment;
