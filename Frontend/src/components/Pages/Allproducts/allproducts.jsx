import React from 'react';
import ProductCard from '../../ProductCard/productCard';
import Loader from '../../Loader/Loader';
import './allproducts.css';

function Allproducts({ products }) {
  return (
    <section className="AllProducts">
      <div className="AllPageContainer">
        <div className="AlltopContainer">
          <div className="Allheading-container">
            <h1>
              All Products
            </h1>
          </div>
          <div className="Allproducts-container">
            {products.length > 0 ? (
              <div className="Allproduct-list">
                {products.map((product, index) => (
                  <div key={index} className="Allproduct-card">
                    <ProductCard
                      key={product._id}
                      id={product._id}
                      image2={product.image2}
                      image={product.image}
                      brand={product.brand}
                      name={product.name}
                      price={product.price} 
                    />
                  </div>
                ))}
              </div>
            ) : (
              <Loader/>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Allproducts;
