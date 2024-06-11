import React from 'react';
import ProductCard from '../../ProductCard/productCard';
import './Lowtop.css';

function LowTop({ products }) {
  // Filter products by category "Low-top"
  const lowTopProducts = products.filter(product => product.category === "Low-top");

  return (
    <section className="LPageProducts">
      <div className="LPageContainer">
        <div className="LtopContainer">
          <div className="heading-container">
            <h1>
              Low Top Products
            </h1>
          </div>
          <div className="products-container">
            {lowTopProducts.length > 0 ? (
              <div className="product-list">
                {lowTopProducts.map((product, index) => (
                  <div key={index} className="product-card">
                    <ProductCard
                      key={product._id}
                      id={product._id}
                      image={product.image}
                      brand={product.brand}
                      name={product.name}
                      price={product.price}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p>No low-top products available</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default LowTop;
