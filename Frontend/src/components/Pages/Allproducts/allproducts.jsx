import React from 'react';
import ProductCard from '../../ProductCard/productCard';

function Allproducts({ products }) {
  return (
    <>
      {products.length > 0 ? (
        <div className="product-list">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              image={product.image}
              brand={product.brand}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      ) : (
        <p>No products available</p>
      )}
    </>
  );
}

export default Allproducts;
