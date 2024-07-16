import React from 'react';
import ProductCard from '../../ProductCard/productCard';
import Loader from '../../Loader/Loader'; 
import './Lowtop.css';

function LowTop({ products }) {
  // Filter products by category "Low-top"
  const lowTopProducts = products.filter(product => product.category === "Low-top");

  return (
    <section className="low-top-products">
      <div className="low-top-container">
        <div className="low-top-header">
          <h1>Low Top Sneakers</h1>
        </div>
        <div className="low-top-list">
          {lowTopProducts.length > 0 ? (
            <div className="low-top-items">
              {lowTopProducts.map((product, index) => (
                <div key={index} className="low-top-item">
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
    </section>
  );
}

export default LowTop;
