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
        const ordersWithProductDetails = await Promise.all(
          ordersData.map(async (order) => {
            const itemsWithDetails = await Promise.all(
              order.items.map(async (item) => {
                const productResponse = await fetch(`http://localhost:3000/products/${item.productId}`);
                const productData = await productResponse.json();
                return {
                  ...item,
                  ...productData
                };
              })
            );
            return {
              ...order,
              items: itemsWithDetails
            };
          })
        );
        setOrders(ordersWithProductDetails);
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
              <ul className="order-items-list">
                {order.items.map((item) => (
                  <li key={item.productId} className="order-product-item">
                    <img src={item.image} alt={item.name} className="order-product-image" />
                    <div className="order-product-details">
                      <p><strong>Name:</strong> {item.name}</p>
                      <p><strong>Category:</strong> {item.category}</p>
                      <p><strong>Quantity:</strong> {item.quantity}</p>
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
