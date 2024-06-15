import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ id, image, brand, name, price,image2 }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="card-container" onClick={handleClick}>
      <div className="card-image">
        <img src={image} alt={name} className="image-main" />
        <img src={image2} alt={name} className="image-hover" />
      </div>
      <div className="card-info">
        <div className="brand-name">{brand}</div>
        <h3 className="product-name">{name}</h3>
        <div className="price">₹ {price}</div>
      </div>
    </div>
  );
}

export default ProductCard;
