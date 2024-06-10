import React from 'react';
// import './Products.css';

function ProductDetails({ products, handleEdit, handleDelete }) {
  return (
    <div className="productsList">
      <h2>Products List</h2>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Brand</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td><img src={product.image} alt={product.name} width="50" /></td>
              <td>{product.brand}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <button className="EditBtn" onClick={() => handleEdit(product)}>Edit</button>
                <button className="DelBtn" onClick={() => handleDelete(product._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductDetails;
