import React from 'react';
import ProductCard from '../../components/ProductCard/productCard';
import './LatestProducts.css';
import { Link } from 'react-router-dom';

function LatestProducts({ products }) {
    // Sort products by date (assuming there's a date property in each product)
    const sortedProducts = products
      .slice() // Create a copy of the products array to avoid mutating the original array
      .sort((a, b) => {
        console.log("Date A:", new Date(a.date));
        console.log("Date B:", new Date(b.date));
        return new Date(b.date) - new Date(a.date);
      }) // Sort by date in descending order
      .slice(0, 12); // Take the first 12 products after sorting
  
    console.log("Sorted Products:", sortedProducts);
  
    return (
      <section className="LatestProducts">
        <div className="container">
          <h2 className="section-title">Latest Products</h2>
          <Link style={{display:'flex', justifyContent:"end", marginRight:'20px'}} to='/allproducts'>View all</Link>
          <div className="product-grid">
            {sortedProducts.map((product, index) => (
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
