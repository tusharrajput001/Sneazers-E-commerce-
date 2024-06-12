import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetailPage.css';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [feedbackList, setFeedbackList] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('details'); // New state for managing tabs

  useEffect(() => {
    fetchProductDetails();
    fetchSimilarProducts();
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

  const fetchSimilarProducts = () => {
    // Assuming there's an endpoint for similar products
    fetch(`http://localhost:3000/products/${id}/similar`)
      .then(response => response.json())
      .then(data => setSimilarProducts(data))
      .catch(error => console.error('Error fetching similar products:', error));
  };

  const handleAddToCart = () => {
    alert(`${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    alert(`Proceeding to buy ${product.name}`);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    setFeedbackList([...feedbackList, feedback]);
    setFeedback('');
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-detail-page">
      <div className="product-main">
        <div className="product-images">
          <img src={product.image} alt={product.name} className="product-image-main" />
          {/* Add thumbnails if available */}
        </div>
        <div className="product-info">
          <h1>{product.name}</h1>
          <h2>{product.brand}</h2>
          <p className="product-price">₹ {product.price}</p>
          <p className="product-category">Category: {product.category}</p>
          <div className="buttons">
            <button onClick={handleAddToCart} className="btn add-to-cart">Add to Cart</button>
            <button onClick={handleBuyNow} className="btn buy-now">Buy Now</button>
          </div>
        </div>
      </div>
      <div className="product-tabs">
        <button onClick={() => setActiveTab('details')} className={activeTab === 'details' ? 'active' : ''}>Details</button>
        <button onClick={() => setActiveTab('reviews')} className={activeTab === 'reviews' ? 'active' : ''}>Reviews</button>
        <button onClick={() => setActiveTab('similar')} className={activeTab === 'similar' ? 'active' : ''}>Similar Products</button>
      </div>
      <div className="product-tab-content">
        {activeTab === 'details' && (
          <div className="product-details">
            <p>{product.description}</p>
            {/* Add more detailed information if available */}
          </div>
        )}
        {activeTab === 'reviews' && (
          <div className="product-feedback">
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
        )}
        {activeTab === 'similar' && (
          <div className="similar-products">
            <h3>Similar Products</h3>
            <ul>
              {similarProducts.map((product, index) => (
                <li key={index}>
                  <img src={product.image} alt={product.name} />
                  <p>{product.name}</p>
                  <p>₹ {product.price}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetailPage;
