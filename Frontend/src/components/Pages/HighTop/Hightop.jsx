import React from 'react';
import ProductCard from '../../ProductCard/productCard';
import './Hightop.css';


function HighTop({ products }) {
  // Filter products by category "High-top"
  const highTopProducts = products.filter(product => product.category === "High-top");

  return (
    <section className="HPageProducts">
      <div className="HPageContainer">
        <div className="HtopContainer">
          <div className="heading-container">
            <h1>
              High Top Products
            </h1>
          </div>
          <div className="products-container">
            {highTopProducts.length > 0 ? (
              <div className="product-list">
                {highTopProducts.map((product, index) => (
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
              <p>No high-top products available</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HighTop;
