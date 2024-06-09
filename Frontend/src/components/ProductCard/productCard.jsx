import React from "react";
import './ProductCard.css'

function ProductCard() {
  return (
    <div className="card-container">
      <div className="card-image">
        <img src="https://www.superkicks.in/cdn/shop/files/FJ3459-160.jpg?v=1705991955&width=360"></img>
      </div>
      <div className="card-info">
        <div className="brand-name">Nike</div>
        <h3 className="product-name">Nike Air Force</h3>
        <div className="price">₹12,000</div>
      </div>
    </div>
  );
}

export default ProductCard;


// import React from "react";
// import './ProductCard.css';

// function ProductCard({ image, brand, name, price }) {
//   return (
//     <div className="card-container">
//       <div className="card-image">
//         <img src={image} alt={name} />
//       </div>
//       <div className="card-info">
//         <div className="brand-name">{brand}</div>
//         <h3 className="product-name">{name}</h3>
//         <div className="price">{price}</div>
//       </div>
//     </div>
//   );
// }

// export default ProductCard;
