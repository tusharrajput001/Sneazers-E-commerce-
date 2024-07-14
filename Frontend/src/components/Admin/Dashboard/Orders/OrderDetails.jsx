import React, { useState, useEffect } from 'react';
import './OrderDetails.css';

function OrderDetails() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("https://sneazers-e-commerce.vercel.app/orders");
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`https://sneazers-e-commerce.vercel.app/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchOrders(); // Refresh orders after updating status
      } else {
        console.error('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div>
      <h2 style={{ margin: '20px', textAlign: 'center' }}>Orders List</h2>
      <table className='orderTable'>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Image</th>
            <th>Product Name</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Price</th>
            <th>Qty.</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Date of Order</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Address</th>
            <th>Action</th>
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
              <td>
                {order.status !== 'Delivered' && order.status !== 'Returned' && order.status !== 'Return Initiated' ? (
                  <button 
                    onClick={() => updateOrderStatus(order._id, 'Delivered')} 
                    className='mark-as-delivered-btn'
                  >
                    Mark as Delivered
                  </button>
                ) : order.status === 'Return Initiated' ? (
                  <button
                    onClick={() => updateOrderStatus(order._id, 'Returned')}
                    className='accept-return-btn' 
                  >
                    Accept Return
                  </button>
                ) : (
                  <button
                    disabled
                    className='delivered-btn'
                    style={{ backgroundColor: 'gray' }}
                  >
                    {order.status}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderDetails;
