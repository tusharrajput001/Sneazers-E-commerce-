import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetailPage.css';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = () => {
    fetch(`http://localhost:3000/products/${id}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
        setFeedbackList(data.feedback || []);
      })
      .catch(error => console.error('Error fetching product details:', error));
  };

  const handleAddToCart = () => {
    // Handle adding product to cart
    alert(`${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    // Handle buy now action
    alert(`Proceeding to buy ${product.name}`);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    // Handle submitting feedback
    setFeedbackList([...feedbackList, feedback]);
    setFeedback('');
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h1>{product.name}</h1>
        <h2>{product.brand}</h2>
        <p>₹ {product.price}</p>
        <p>Category: {product.category}</p>
        <div className="buttons">
          <button onClick={handleAddToCart} className="btn add-to-cart">Add to Cart</button>
          <button onClick={handleBuyNow} className="btn buy-now">Buy Now</button>
        </div>
        <div className="feedback-section">
          <h3>Feedback</h3>
          <form onSubmit={handleFeedbackSubmit}>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Leave your feedback here"
              required
            ></textarea>
            <button type="submit" className="btn submit-feedback">Submit Feedback</button>
          </form>
          <div className="feedback-list">
            {feedbackList.map((fb, index) => (
              <p key={index}>{fb}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
