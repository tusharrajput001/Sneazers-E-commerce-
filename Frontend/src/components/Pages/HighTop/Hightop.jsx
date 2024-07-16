import React, { useEffect, useState } from 'react';
import ProductCard from '../../ProductCard/productCard';
import Loader from '../../Loader/Loader'; 
import './Hightop.css';

function HighTop({ products }) {
  const [loading, setLoading] = useState(true);
  const [highTopProducts, setHighTopProducts] = useState([]);

  useEffect(() => {
    // Simulate an API call
    setTimeout(() => {
      const filteredProducts = products.filter(product => product.category === "High-top");
      setHighTopProducts(filteredProducts);
      setLoading(false);
    }, 1000); // Adjust timeout as needed to simulate loading
  }, [products]);

  return (
    <section className="high-top-products">
      <div className="high-top-container">
        <div className="high-top-header">
          <h1>High Top Sneakers</h1>
        </div>
        <div className="high-top-list">
          {loading ? (
            <Loader /> // Show loader while loading
          ) : (
            <div className="high-top-items">
              {highTopProducts.length > 0 ? (
                highTopProducts.map((product, index) => (
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
                ))
              ) : (
                <Loader /> 
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default HighTop;
