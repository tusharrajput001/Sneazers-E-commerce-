import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./orders.css";

function Orders() {
  const { userId } = useParams();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  const fetchOrders = async () => {
    try {
      console.log("Fetching orders for user:", userId);
      const response = await fetch(`http://localhost:3000/orders/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      console.log("Orders fetched:", data);
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div className="orders-page">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-item">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Total Amount:</strong> ₹ {order.totalAmount / 100}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Items:</strong></p>
              <ul>
                {order.items.map((item) => (
                  <li key={item.productId}>
                    {item.productId} - Quantity: {item.quantity}
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
