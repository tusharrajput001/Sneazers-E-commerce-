import React from "react";
import "./HtopHome.css";
import ProductCard from "../../ProductCard/productCard";

function ShowcaseHome(props) {
  return (
    <div className="HtopContainer">

      <div className="heading-container">
        <h1>{props.name} Sneakers</h1>
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

export default ShowcaseHome;
