import React from 'react';
import ProductCard from '../../components/ProductCard/productCard';
import './LatestProducts.css';
import { Link } from 'react-router-dom';

function LatestProducts({ products }) {
    // Filter products with orderAddedDate
    const productsWithDate = products.filter(product => product.orderAddedDate);

    // Sort products by orderAddedDate in descending order
    const sortedProducts = productsWithDate.sort((a, b) => new Date(b.orderAddedDate) - new Date(a.orderAddedDate));

    // Take the first 8 sorted products
    const displayedProducts = sortedProducts.slice(0, 15);

    return (
      <section className="LatestProducts">
        <div className="container">
          <h2 className="section-title">Latest Products</h2>
          <Link className='viewAll' style={{display:'flex', justifyContent:"end",fontSize:'2vh',  textDecoration:'none'}} to='/allproducts'>View all</Link>
          <div className="product-grid">
            {displayedProducts.map(product => (
              <div key={product._id} className="product-card">
                <ProductCard
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
        </div>
      </section>
    );
}

export default LatestProducts;
