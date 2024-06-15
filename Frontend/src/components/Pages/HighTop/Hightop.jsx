import React from 'react';
import ProductCard from '../../ProductCard/productCard';
import './Hightop.css';

function HighTop({ products }) {
  // Filter products by category "High-top"
  const highTopProducts = products.filter(product => product.category === "High-top");

  return (
    <section className="high-top-products">
      <div className="high-top-container">
        <div className="high-top-header">
          <h1>High Top Sneakers</h1>
        </div>
        <div className="high-top-list">
          {highTopProducts.length > 0 ? (
            <div className="high-top-items">
              {highTopProducts.map((product, index) => (
                <div key={index} className="high-top-item">
                  <ProductCard
                    key={product._id}
                    id={product._id}
                    image={product.image}
                    image2={product.image2}
                    brand={product.brand}
                    name={product.name}
                    price={product.price}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p>No high-top products available</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default HighTop;
