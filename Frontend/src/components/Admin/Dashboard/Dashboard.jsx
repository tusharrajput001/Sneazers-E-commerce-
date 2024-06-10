import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard({ addProduct, fetchProducts, deleteProduct, updateProduct }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    image: '',
    brand: '',
    name: '',
    price: ''
  });
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, [fetchProducts]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct._id, newProduct).then(updatedProduct => {
        setProducts(products.map(product => product._id === updatedProduct._id ? updatedProduct : product));
      });
    } else {
      addProduct(newProduct).then(addedProduct => {
        setProducts([...products, addedProduct]);
      });
    }
    setNewProduct({ image: '', brand: '', name: '', price: '' });
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setNewProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = (productId) => {
    deleteProduct(productId).then(() => {
      setProducts(products.filter(product => product._id !== productId));
    });
  };

  return (
    <>
      <h1 style={{ display: 'flex', justifyContent: 'center' }}>Admin Panel</h1>

      <div className='buttonsContainer' style={{ textAlign: 'center', padding: '20px' }}>
        <Link to='/'><p className="button1">Products</p></Link>
        <Link to='/'><p className="button2">Orders</p></Link>
        <Link to='/'><p className="button3">Users</p></Link>
      </div>

      <div className="addProduct">
        <button onClick={() => setIsFormOpen(true)}>Add Product +</button>
      </div>

      {isFormOpen && (
        <div className="form-popup">
          <form className="form-container" onSubmit={handleSubmit}>
            <h2>{editingProduct ? "Edit Product" : "Add Product"}</h2>
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
            <button type="submit" className="btn">{editingProduct ? "Update Product" : "Add Product"}</button>
            <button type="button" className="btn cancel" onClick={() => { setIsFormOpen(false); setEditingProduct(null); }}>Close</button>
          </form>
        </div>
      )}

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
    </>
  );
}

export default Dashboard;
