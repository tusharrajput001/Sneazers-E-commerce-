import React, { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard/productCard";
import { Link } from "react-router-dom";
import "./LatestProducts.css";
import Loader from "../Loader/Loader";

function LatestProducts({ products }) {
  const [loading, setLoading] = useState(true);
  const [displayedProducts, setDisplayedProducts] = useState([]);

  useEffect(() => {
    // Filter products with orderAddedDate
    const productsWithDate = products.filter(
      (product) => product.orderAddedDate
    );

    // Sort products by orderAddedDate in descending order
    const sortedProducts = productsWithDate.sort(
      (a, b) => new Date(b.orderAddedDate) - new Date(a.orderAddedDate)
    );

    // Take the first 15 sorted products
    const displayedProducts = sortedProducts.slice(0, 15);

    setTimeout(() => {
      setDisplayedProducts(displayedProducts);
      setLoading(false);
    },2000);
  }, [products]);

  return (
    <section className="LatestProducts">
      <div className="container">
        <h2 className="section-title">Latest Products</h2>
        <Link className="viewAll" to="/allproducts">
          View all
        </Link>
        {loading ? (
          <Loader />
        ) : (
          <div className="product-grid">
            {displayedProducts.map((product) => (
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
        )}
      </div>
    </section>
  );
}

export default LatestProducts;
