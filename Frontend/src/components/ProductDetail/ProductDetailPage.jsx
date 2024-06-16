import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../../Contexts/CartContext'; // Import the useCart hook
import { toast } from 'react-toastify'; // Import toast from react-toastify
import ProductCard from '../ProductCard/productCard';
import './ProductDetailPage.css';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState(''); // State for selected shoe size
  const { addToCart } = useCart(); // Get addToCart function from context

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
    if (!selectedSize) {
      toast.error('Please select a shoe size.');
      return;
    }

    addToCart({ ...product, selectedSize }); // Include selectedSize in addToCart

    toast.success(`${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast.error('Please select a shoe size.');
      return;
    }

    alert(`Proceeding to buy ${product.name} in size ${selectedSize}`);
  };

  if (!product) return <div>Loading...</div>;

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
          {product.image2 && (
            <img src={product.image2} alt={`${product.name} - additional`} className="product-image-secondary" />
          )}
        </div>
        <div className="product-info">
          <h1>{product.name}</h1>
          <h2>{product.brand}</h2>
          <p className="product-price">₹ {product.price}</p>
          {descriptionContent}
          <p className="product-category">Category: {product.category}</p>

          {/* Select shoe size */}
          <div className="select-size">
            <label>Select Size:</label>
            <div className="size-buttons">
              {['6', '7', '8', '9', '10', '11', '12'].map(size => (
                <button
                  key={size}
                  className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="buttons">
            <button onClick={handleAddToCart} className="btn add-to-cart" disabled={!selectedSize}>
              Add to Cart
            </button>
            <button onClick={handleBuyNow} className="btn buy-now" disabled={!selectedSize}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="similar-products">
        <h3>Similar Products</h3>
        <Link to={`/${product.category.toLowerCase()}`} className="viewMore">More</Link>
        <div className="similar-products-list">
          {similarProducts.map(product => (
            <ProductCard 
              key={product._id} 
              id={product._id} 
              image={product.image} 
              image2={product.image2}
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
