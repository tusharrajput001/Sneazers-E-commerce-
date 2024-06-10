import React from 'react';
import ProductCard from '../../ProductCard/productCard';
import './Midtop.css';
function MidTop({ products }) {
  // Filter products by category "Mid-top"
  const midTopProducts = products.filter(product => product.category === "Mid-top");

  return (
    <section className="MPageProducts">
      <div className="MPageContainer">
        <div className="MtopContainer">
          <div className="heading-container">
            <h1>
              Mid Top Products
            </h1>
          </div>
          <div className="products-container">
            {midTopProducts.length > 0 ? (
              <div className="product-list">
                {midTopProducts.map((product, index) => (
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
            ) : (
              <p>No mid-top products available</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MidTop;
