import React, { useState, useEffect } from 'react';
import { useNavigate, Link, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Dashboard.css';
import ProductDetails from './Products/ProductDetails';
import OrderDetails from './Orders/OrderDetails';
import UserDetails from './Users/UserDetails';
import Loader from '../../Loader/Loader'

function Dashboard({ addProduct, fetchProducts, deleteProduct, updateProduct }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    image: '',
    image2: '',
    brand: '',
    name: '',
    price: '',
    category: '',
    description: ''
  });
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchProducts().then(setProducts);
      setLoading(false);
    };
    fetchData();
  }, [fetchProducts]);

  useEffect(() => {
    setLoading(true);
  }, [location.pathname]);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => setLoading(false), 500); // Simulate loading time
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct._id, newProduct).then(updatedProduct => {
        setProducts(products.map(product => product._id === updatedProduct._id ? updatedProduct : product));
        toast.success('Product updated successfully!');
      });
    } else {
      addProduct(newProduct).then(addedProduct => {
        setProducts([...products, addedProduct]);
        toast.success('Product added successfully!');
      });
    }
    setNewProduct({ image: '', image2: '', brand: '', name: '', price: '', category: '', description: '' });
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
      toast.success('Product deleted successfully!');
    });
  };

  return (
    <>
      <ToastContainer />
      <h1 style={{ display: 'flex', justifyContent: 'center' }}>Admin Panel</h1>

      <div className='buttonsContainer' style={{ textAlign: 'center', padding: '20px' }}>
        <Link to='products' className="button1"><i className="fas fa-box"></i> Products</Link>
        <Link to='orders' className="button2"><i className="fas fa-shopping-cart"></i> Orders</Link>
        <Link to='users' className="button3"><i className="fas fa-users"></i> Users</Link>
      </div>

      {location.pathname === '/dashboard/products' && (
        <div className="addProduct">
          <button onClick={() => setIsFormOpen(true)}>Add Product +</button>
        </div>
      )}

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
              name="image2"
              value={newProduct.image2}
              onChange={handleInputChange}
              placeholder="Enter second product image URL"
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
            <input
              type="text"
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              placeholder="Enter category"
              required
            />
            <textarea
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              placeholder="Enter product description"
              required
            />
            <button type="submit" className="btn btn-update">{editingProduct ? "Update Product" : "Add Product"}</button>
            <button type="button" className="btn cancel" onClick={() => { setIsFormOpen(false); setEditingProduct(null); }}>Close</button>
          </form>
        </div>
      )}

      {loading && <Loader />} {/* Display loader when loading */}

      <Routes>
        <Route path="products" element={<ProductDetails products={products} handleEdit={handleEdit} handleDelete={handleDelete} />} />
        <Route path="orders" element={<OrderDetails />} />
        <Route path="users" element={<UserDetails />} />
        <Route path="/" element={<Navigate to="products" />} />
      </Routes>
    </>
  );
}

export default Dashboard;
