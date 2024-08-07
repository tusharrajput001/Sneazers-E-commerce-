import React from 'react';
import './ProductDetails.css';

function ProductDetails({ products, handleEdit, handleDelete }) {
  return (
    <div className="productsList">
      <h2>Products List</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th style={{ width: '12%' }}>Images</th>
              <th>Brand</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>
                  <img src={product.image} alt={product.name} width="50" />
                  <img style={{ marginLeft: '10px' }} src={product.image2} alt={product.name} width="50" />
                </td>
                <td>{product.brand}</td>
                <td>{product.name}</td>
                <td>₹ {product.price}</td>
                <td>{product.category}</td>
                <td className='actionsData'>
                  <button className="EditBtn" onClick={() => handleEdit(product)}>Edit</button>
                  <button className="DelBtn" onClick={() => handleDelete(product._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductDetails;
