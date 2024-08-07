import React from 'react';
import ProductCard from '../../ProductCard/productCard';
import './Sports.css';
import Loader from '../../Loader/Loader';

function Sports({ products }) {
  // Filter products by category "Sports"
  const sportsProducts = products.filter(product => product.category === "sports");

  return (
    <section className="sports-page-products">
      <div className="sports-page-container">
        <div className="sports-top-container">
          <div className="sports-heading-container">
            <h1>Sports Shoes</h1>
          </div>
          <div className="sports-products-container">
            {sportsProducts.length > 0 ? (
              <div className="sports-product-list">
                {sportsProducts.map((product, index) => (
                  <div key={index} className="sports-product-card">
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
              <div className="loader-container">
                <Loader />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Sports;
