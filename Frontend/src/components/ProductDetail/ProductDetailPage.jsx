import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = () => {
    fetch(`http://localhost:3000/products/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Error fetching product details:', error));
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.name} />
      <h1>{product.name}</h1>
      <h2>{product.brand}</h2>
      <p>₹ {product.price}</p>
      <p>Category: {product.category}</p>
    </div>
  );
}

export default ProductDetailPage;
