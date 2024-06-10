import React from 'react';
import ProductCard from '../../components/ProductCard/productCard';
import './LatestProducts.css';

function LatestProducts({ products }) {
  // Sort products by date (assuming there's a date property in each product)
  const sortedProducts = products.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 12);

  return (
    <section className="LatestProducts">
      <div className="container">
        <h2 className="section-title">Latest Products</h2>
        <div className="product-grid">
          {sortedProducts.map((product, index) => (
            <div key={index} className="product-card">
              <ProductCard
                image={product.image}
                brand={product.brand}
                name={product.name}
                price={product.price}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LatestProducts;
