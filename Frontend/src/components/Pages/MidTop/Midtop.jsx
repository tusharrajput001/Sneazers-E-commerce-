import React from 'react';
import ProductCard from '../../ProductCard/productCard';
import Loader from '../../Loader/Loader'; 
import './Midtop.css';

function MidTop({ products }) {
  // Filter products by category "Mid-top"
  const midTopProducts = products.filter(product => product.category === "Mid-top");

  return (
    <section className="mid-top-products">
      <div className="mid-top-container">
        <div className="mid-top-header">
          <h1>Mid Top Sneakers</h1>
        </div>
        <div className="mid-top-list">
          {midTopProducts.length > 0 ? (
            <div className="mid-top-items">
              {midTopProducts.map((product, index) => (
                <div key={index} className="mid-top-item">
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
            <Loader/>
          )}
        </div>
      </div>
    </section>
  );
}

export default MidTop;
