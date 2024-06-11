import React from 'react';
import ProductCard from '../../ProductCard/productCard';
import './Sports.css';
function Sports({ products }) {
  // Filter products by category "Sports"
  const sportsProducts = products.filter(product => product.category === "sports");

  return (
    <section className="SPageProducts">
      <div className="SPageContainer">
        <div className="StopContainer">
          <div className="heading-container">
            <h1>
              Sports Products
            </h1>
          </div>
          <div className="products-container">
            {sportsProducts.length > 0 ? (
              <div className="product-list">
                {sportsProducts.map((product, index) => (
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
              <p>No sports products available</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Sports;
