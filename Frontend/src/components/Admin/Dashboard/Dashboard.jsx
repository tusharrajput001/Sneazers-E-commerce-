import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard({ addProduct }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    image: '',
    brand: '',
    name: '',
    price: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(newProduct);
    setNewProduct({ image: '', brand: '', name: '', price: '' });
    setIsFormOpen(false);
    navigate('/allproducts');
  };

  return (
    <>
      <h1 style={{ display: 'flex', justifyContent: 'center' }}>Welcome Admin</h1>

      <div className='buttonsContainer' style={{ textAlign: 'center', padding: '20px' }}>
        <button className="button1">Products</button>
        <button className="button2">Orders</button>
        <button className="button3">Users</button>
      </div>

      <div className="addProduct">
        <button onClick={() => setIsFormOpen(true)}>Add Product +</button>
      </div>

      {isFormOpen && (
        <div className="form-popup">
          <form className="form-container" onSubmit={handleSubmit}>
            <h2>Add Product</h2>
            <input
              type="text"
              name="image"
              value={newProduct.image}
              onChange={handleInputChange}
              placeholder="Enter product image URL"
              required
            />
            <input
              type="text"
              name="brand"
              value={newProduct.brand}
              onChange={handleInputChange}
              placeholder="Enter brand name"
              required
            />
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              placeholder="Enter product name"
              required
            />
            <input
              type="text"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              placeholder="Enter price"
              required
            />
            <button type="submit" className="btn">Add Product</button>
            <button type="button" className="btn cancel" onClick={() => setIsFormOpen(false)}>Close</button>
          </form>
        </div>
      )}
    </>
  );
}

export default Dashboard;
