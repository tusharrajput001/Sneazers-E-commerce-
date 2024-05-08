import React from "react";
import "./HtopHome.css";
import ProductCard from "../../ProductCard/productCard";

function HighTopHome() {
  return (
    <div className="HtopContainer">

      <div className="heading-container">
        <h1>High-Top Sneakers</h1>
      </div>
      <div className="products-container">
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
      </div>
      
    </div>
  );
}

export default HighTopHome;
