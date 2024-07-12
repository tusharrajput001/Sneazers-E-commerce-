// src/components/SearchResults/SearchResults.js
import React from 'react';
import ProductCard from '../ProductCard/productCard';
import './SearchResults.css';    

function SearchResults({ products }) {
  return (
    <section className="SearchResultsPage">
      <div className="SearchResultsContainer">
        <div className="SearchResultsHeadingContainer">
          <h1>Search Results</h1>
        </div>
        <div className="SearchResultsProductsContainer">
          {products.length > 0 ? (
            <div className="Searchproduct-list">
              {products.map((product, index) => (
                <div key={index} className="Searchproduct-card">
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
            <p>No products found</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default SearchResults;
