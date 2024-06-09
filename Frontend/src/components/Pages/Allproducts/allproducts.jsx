import React from 'react';
import ProductCard from '../../ProductCard/productCard';
import './allproducts.css'; // Import the CSS file

function Allproducts({ products }) {
  return (
    <>
    
      {products.length > 0 ? (
        <div className="product-list">
          {products.map((product, index) => (
            <div key={index} className="product-card"> {/* Wrap ProductCard in a div with the product-card class */}
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
        <p>No products available</p>
      )}
    </>
  );
}

export default Allproducts;
