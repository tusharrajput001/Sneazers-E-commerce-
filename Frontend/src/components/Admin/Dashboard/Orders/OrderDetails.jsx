import React, { useState, useEffect } from 'react';
import './OrderDetails.css';

function OrderDetails() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:3000/orders");
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div>
      <h2>Orders List</h2>
      <table className='orderTable'>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Image</th>
            <th>Product Name</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Date of Order</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>
                {order.items.map(item => (
                  <img 
                    key={item.productId._id} 
                    src={item.productId.image} 
                    alt={item.productId.name} 
                    style={{ width: '50px', height: '50px' }} 
                  />
                ))}
              </td>
              <td>
                {order.items.map(item => item.productId.name).join(', ')}
              </td>
              <td>
                {order.items.map(item => item.productId.brand).join(', ')}
              </td>
              <td>
                {order.items.map(item => item.productId.category).join(', ')}
              </td>
              <td>
                {order.items.map(item => item.productId.price).join(', ')}
              </td>
              <td>
                {order.items.map(item => item.quantity).join(', ')}
              </td>
              <td>₹ {(order.totalAmount / 100).toFixed(2)}</td>
              <td>{order.status}</td>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
              <td>{order.name}</td>
              <td>{order.email}</td>
              <td>{order.contact}</td>
              <td>{order.address}</td>
            </tr>
          ))}
        </tbody>
      </table>  
    </div>
  );
}

export default OrderDetails;
