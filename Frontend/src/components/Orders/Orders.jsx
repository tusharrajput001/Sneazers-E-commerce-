import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./orders.css";

function Orders() {
  const { userId } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:3000/orders/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const ordersData = await response.json();
        setOrders(ordersData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="orders-page">
      <h2>My Orders</h2>
      <strong>My orders: {orders.length}</strong>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-item">
              <div className="order-header">
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Total Amount:</strong> ₹{(order.totalAmount / 100).toFixed(2)}</p>
                <p><strong>Status:</strong> {order.status}</p>
              </div>
              <ul className="order-items-list">
                {order.items.map((item) => (
                  <li key={item.productId._id} className="order-product-item">
                    <img src={item.productId.image} alt={item.productId.name} className="order-product-image" />
                    <div className="order-product-details">
                      <p><strong>Name:</strong> {item.productId.name}</p>
                      <p><strong>Brand:</strong> {item.productId.brand}</p>
                      <p><strong>Category:</strong> {item.productId.category}</p>
                      <p><strong>Quantity:</strong> {item.quantity}</p>
                      <p><strong>Size:</strong> {item.size}</p>
                      <p><a href="#" className="rate-review-link">Rate & Review Product</a></p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
