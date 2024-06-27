import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./orders.css";

function Orders() {
  const { userId } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState(null); // State to track selected product

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

  const submitReview = async () => {
    if (reviewText.trim() === '' || rating === 0) {
      alert('Please provide a rating and review text.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: selectedProductId, userId, rating, reviewText }),
      });

      if (response.ok) {
        setReviewText('');
        setRating(0);
        alert('Review submitted successfully!');
      } else {
        alert('Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

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
                      {order.status === 'Delivered' && (
                        <div className="review-section">
                          <h4>Rate & Review Product</h4>
                          <textarea
                            value={selectedProductId === item.productId._id ? reviewText : ''}
                            onChange={(e) => {
                              setReviewText(e.target.value);
                              setSelectedProductId(item.productId._id);
                            }}
                            placeholder="Write your review here..."
                          ></textarea>
                          <select value={selectedProductId === item.productId._id ? rating : 0} onChange={(e) => setRating(e.target.value)}>
                            <option value={0}>Select Rating</option>
                            <option value={1}>1 Star</option>
                            <option value={2}>2 Stars</option>
                            <option value={3}>3 Stars</option>
                            <option value={4}>4 Stars</option>
                            <option value={5}>5 Stars</option>
                          </select>
                          <button onClick={submitReview}>Submit Review</button>
                        </div>
                      )}
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
