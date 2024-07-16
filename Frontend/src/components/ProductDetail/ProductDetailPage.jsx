import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../../Contexts/CartContext";
import { useWishlist } from "../../Contexts/WishlistContext"; // Import useWishlist
import { toast } from "react-toastify";
import ProductCard from "../ProductCard/productCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import Loader from "../Loader/Loader";
import "./ProductDetailPage.css";

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [reviews, setReviews] = useState([]);
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist(); // Use wishlist context

  useEffect(() => {
    fetchProductDetails();
    fetchProductReviews();
  }, [id]);

  const fetchProductDetails = () => {
    fetch(`https://sneazers-e-commerce.vercel.app/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        fetchSimilarProducts(data.category);
      })
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  };

  const fetchSimilarProducts = (category) => {
    fetch(`https://sneazers-e-commerce.vercel.app/products/category/${category}`)
      .then((response) => response.json())
      .then((data) => {
        const similarProducts = data.filter((product) => product._id !== id);
        const shuffled = similarProducts.sort(() => 0.5 - Math.random());
        setSimilarProducts(shuffled.slice(0, 5));
      })
      .catch((error) =>
        console.error("Error fetching similar products:", error)
      );
  };

  const fetchProductReviews = () => {
    fetch(`https://sneazers-e-commerce.vercel.app/reviews/${id}`)
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching reviews:", error));
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a shoe size.");
      return;
    }

    addToCart({ ...product, selectedSize });

    toast.success(`${product.name} added to cart`);
  };

  const handleWishlistClick = () => {
    if (isProductInWishlist(product._id)) {
      removeFromWishlist(product._id);
      toast.info(`${product.name} removed from wishlist`);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist`);
    }
  };

  const isProductInWishlist = (productId) => {
    return wishlist.some((item) => item._id === productId);
  };

  if (!product) return <div><Loader/></div>;

  let descriptionContent;
  if (product.description && product.description.includes(",")) {
    const descriptionItems = product.description
      .split(",")
      .map((item, index) => <li key={index}>{item.trim()}</li>);
    descriptionContent = <ul>{descriptionItems}</ul>;
  } else {
    descriptionContent = <p>{product.description}</p>;
  }

  return (
    <div className="product-detail-page">
      <div className="product-main">
        <div className="product-images">
          <img
            src={product.image}
            alt={product.name}
            className="product-image-main"
          />
          {product.image2 && (
            <img
              src={product.image2}
              alt={`${product.name} - additional`}
              className="product-image-secondary"
            />
          )}
        </div>
        <div className="product-info">
          <h1>{product.name}</h1>
          <h2>{product.brand}</h2>
          <p className="product-price">₹ {product.price}</p>
          {descriptionContent}
          <p className="product-category">Category: {product.category}</p>

          <div className="select-size">
            <label>Select Size:</label>
            <div className="size-buttons">
              {["6", "7", "8", "9", "10", "11", "12"].map((size) => (
                <button
                  key={size}
                  className={`size-button ${
                    selectedSize === size ? "selected" : ""
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="buttons">
            <button
              onClick={handleAddToCart}
              className="btn add-to-cart"
              disabled={!selectedSize}
            >
              Add to Cart
            </button>
            <button
              style={{ width: '60px', border: "none", backgroundColor: 'transparent' }}
              onClick={handleWishlistClick}
            >
              <FontAwesomeIcon
                icon={isProductInWishlist(product._id) ? faHeartSolid : faHeartRegular}
                className="heart-icon"
              />
            </button>
          </div>
        </div>
      </div>

      <div className="similar-products">
        <h3>Similar Products</h3>
        <Link to={`/${product.category.toLowerCase()}`} className="viewMore">
          More
        </Link>
        <div className="similar-products-list">
          {similarProducts.map((product) => (
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

      <div className="reviews-section">
        <h3>Customer Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <ul className="reviews-list">
            {reviews.map((review) => (
              <li key={review._id} className="review-item">
                <div className="star-rating">
                  {[...Array(review.rating)].map((_, index) => (
                    <FontAwesomeIcon
                      icon={faStar}
                      key={index}
                      className="star-icon"
                    />
                  ))}
                </div>
                <p>{review.reviewText}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ProductDetailPage;
