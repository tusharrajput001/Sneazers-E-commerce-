import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../ProductCard/productCard';
import './ProductDetailPage.css';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = () => {
    fetch(`http://localhost:3000/products/${id}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
        fetchSimilarProducts(data.category);
      })
      .catch(error => console.error('Error fetching product details:', error));
  };

  const fetchSimilarProducts = (category) => {
    fetch(`http://localhost:3000/products/category/${category}`)
      .then(response => response.json())
      .then(data => {
        const similarProducts = data.filter(product => product._id !== id);
        const shuffled = similarProducts.sort(() => 0.5 - Math.random());
        setSimilarProducts(shuffled.slice(0, 4));
      })
      .catch(error => console.error('Error fetching similar products:', error));
  };

  const handleAddToCart = () => {
    alert(`${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    alert(`Proceeding to buy ${product.name}`);
  };

  if (!product) return <div>Loading...</div>;

  // Render description as list items if comma is detected
  let descriptionContent;
  if (product.description && product.description.includes(',')) {
    const descriptionItems = product.description.split(',').map((item, index) => (
      <li key={index}>{item.trim()}</li>
    ));
    descriptionContent = <ul>{descriptionItems}</ul>;
  } else {
    descriptionContent = <p>{product.description}</p>;
  }

  return (
    <div className="product-detail-page">
      <div className="product-main">
        <div className="product-images">
          <img src={product.image} alt={product.name} className="product-image-main" />
        </div>
        <div className="product-info">
          <h1>{product.name}</h1>
          <h2>{product.brand}</h2>
          <p className="product-price">₹ {product.price}</p>
          {descriptionContent}
          <p className="product-category">Category: {product.category}</p>
          <div className="buttons">
            <button onClick={handleAddToCart} className="btn add-to-cart">Add to Cart</button>
            <button onClick={handleBuyNow} className="btn buy-now">Buy Now</button>
          </div>
        </div>
      </div>

      <div className="similar-products">
        <h3>Similar Products</h3>
        <Link to={`/${product.category.toLowerCase()}`} className="viewMore">More</Link> {/* Use Link for navigation */}
        <div className="similar-products-list">
        
          {similarProducts.map(product => (
            <ProductCard 
              key={product._id} 
              id={product._id} 
              image={product.image} 
              brand={product.brand} 
              name={product.name} 
              price={product.price} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
