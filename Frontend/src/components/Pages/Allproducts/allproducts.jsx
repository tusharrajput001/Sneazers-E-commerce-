import React from 'react';
import ProductCard from '../../ProductCard/productCard';
import './allproducts.css';

function Allproducts({ products }) {
  return (
    <section className="HPageProducts">
      <div className="HPageContainer">
        <div className="HtopContainer">
          <div className="heading-container">
            <h1>
              All Products
            </h1>
          </div>
          <div className="products-container">
            {products.length > 0 ? (
              <div className="product-list">
                {products.map((product, index) => (
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
              <p>No products available</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Allproducts;
