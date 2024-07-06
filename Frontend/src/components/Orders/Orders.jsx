import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        const ordersWithRating = ordersData.map((order) => ({
          ...order,
          items: order.items.map((item) => ({
            ...item,
            rating: 0,
            reviewText: "",
          })),
        }));
        setOrders(ordersWithRating);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  const submitReview = async (productId, reviewText, rating) => {
    if (reviewText.trim() === "" || rating === 0) {
      toast.error("Please provide a rating and review text.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          userId,
          rating,
          reviewText,
        }),
      });

      if (response.ok) {
        const updatedOrders = orders.map((order) => ({
          ...order,
          items: order.items.map((item) => {
            if (item.productId === productId) {
              return {
                ...item,
                rating,
                reviewText,
              };
            }
            return item;
          }),
        }));
        setOrders(updatedOrders);
        toast.success("Review submitted successfully!");
      } else {
        toast.error("Failed to submit review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const handleReturnRequest = async (orderId, productId, orderDate) => {
    const orderDateObj = new Date(orderDate);
    const currentDate = new Date();
    const differenceInTime = currentDate.getTime() - orderDateObj.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    if (differenceInDays > 7) {
      toast.error("Cannot return orders older than 7 days.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/orders/${orderId}/return`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          productId,
        }),
      });

      if (response.ok) {
        const updatedOrders = orders.map((order) => {
          if (order._id === orderId) {
            return { ...order, status: "Return Initiated" };
          }
          return order;
        });
        setOrders(updatedOrders);
        toast.success("Return request submitted successfully!");
      } else {
        toast.error("Failed to submit return request");
      }
    } catch (error) {
      console.error("Error submitting return request:", error);
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
                <p><strong>Total Amount:</strong> ₹ {(order.totalAmount / 100).toFixed(2)}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <ul className="order-items-list">
                {order.items.map((item) => (
                  <li key={item.productId._id} className="order-product-item">
                    <img
                      src={item.productId.image}
                      alt={item.productId.name}
                      className="order-product-image"
                    />
                    <div className="order-product-details">
                      <p><strong>Name:</strong> {item.productId.name}</p>
                      <p><strong>Brand:</strong> {item.productId.brand}</p>
                      <p><strong>Category:</strong> {item.productId.category}</p>
                      <p><strong>Quantity:</strong> {item.quantity}</p>
                      <p><strong>Size:</strong> {item.size}</p>
                      {order.status === "Delivered" && (
                        <div className="review-section">
                          <h4>Rate & Review Product</h4>
                          <textarea
                            value={item.reviewText}
                            onChange={(e) => {
                              const updatedReviewText = e.target.value;
                              setOrders((prevOrders) =>
                                prevOrders.map((prevOrder) => {
                                  if (prevOrder._id === order._id) {
                                    return {
                                      ...prevOrder,
                                      items: prevOrder.items.map((prevItem) => {
                                        if (prevItem.productId === item.productId) {
                                          return { ...prevItem, reviewText: updatedReviewText };
                                        }
                                        return prevItem;
                                      }),
                                    };
                                  }
                                  return prevOrder;
                                })
                              );
                            }}
                            placeholder="Write your review here..."
                          ></textarea>
                          <div className="star-rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <FontAwesomeIcon
                                key={star}
                                icon={star <= item.rating ? solidStar : regularStar}
                                className="star-icon"
                                onClick={() =>
                                  submitReview(item.productId, item.reviewText, star)
                                }
                              />
                            ))}
                          </div>
                          <button
                            onClick={() => handleReturnRequest(order._id, item.productId._id, order.createdAt)}
                            style={{ borderRadius: "50px", padding: "5px 20px", marginTop: "20px" }}
                          >
                            Return
                          </button>
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
