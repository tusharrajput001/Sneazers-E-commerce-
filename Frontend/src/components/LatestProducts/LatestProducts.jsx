import React from 'react';
import ProductCard from '../../components/ProductCard/productCard';
import './LatestProducts.css';
import { Link } from 'react-router-dom';

function LatestProducts({ products }) {
    // Separate products with and without orderAddedDate
    const productsWithDate = products.filter(product => product.orderAddedDate);
    const productsWithoutDate = products.filter(product => !product.orderAddedDate);

    // Sort products with orderAddedDate by descending order
    const sortedProducts = productsWithDate
      .slice()
      .sort((a, b) => new Date(b.orderAddedDate) - new Date(a.orderAddedDate));

    // Take the first 8 sorted products with orderAddedDate
    const displayedProducts = sortedProducts.slice(0, 8);

    // Concatenate products without orderAddedDate after the sorted ones
    const allDisplayedProducts = [...displayedProducts, ...productsWithoutDate];

    return (
      <section className="LatestProducts">
        <div className="container">
          <h2 className="section-title">Latest Products</h2>
          <Link style={{display:'flex', justifyContent:"end", marginRight:'20px'}} to='/allproducts'>View all</Link>
          <div className="product-grid">
            {allDisplayedProducts.map((product, index) => ( // Corrected mapping here
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
        </div>
      </section>
    );
}

export default LatestProducts;
