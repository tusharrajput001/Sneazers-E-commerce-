import React from 'react';
import './ProductCard.css';

function ProductCard({ image, brand, name, price }) {
  return (
    <div className="card-container">
      <div className="card-image">
        <img src={image} alt={name} />
      </div>
      <div className="card-info">
        <div className="brand-name">{brand}</div>
        <h3 className="product-name">{name}</h3>
        <div className="price">{price}</div>
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
