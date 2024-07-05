import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toastify
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { useState, useEffect } from "react";

// Context
import { AuthProvider } from "./Contexts/AuthContext";
import { CartProvider } from "./Contexts/CartContext";
import { WishlistProvider } from "./Contexts/WishlistContext";

// Components Import
import Login from "./components/Login/login";
import Signup from "./components/Signup/signup";
import Navbar from "./components/Navbar/navbar";
import Slider from "./components/Slider/Slider";
import Account from "./components/Account/account";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import Allproducts from "./components/Pages/Allproducts/allproducts";
import AdminProtectedRoute from "./components/ProtectedRoute/AdminProtectedRoute";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Lowtop from "./components/Pages/LowTop/Lowtop";
import Midtop from "./components/Pages/MidTop/Midtop";
import HighTop from "./components/Pages/HighTop/Hightop";
import Sports from "./components/Pages/Sports/Sports";
import LatestProducts from "./components/LatestProducts/LatestProducts";
import ProductDetailPage from "./components/ProductDetail/ProductDetailPage";
import Footer from "./components/Footer/Footer";
import Cart from "./components/Cart/cart";
import Payment from "./components/Payment/Payment";
import Orders from "./components/Orders/Orders";
import Wishlist from "./components/Wishlist/Wishlist";



const userId = localStorage.getItem("_id");



function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const fetchProducts = () => {
    return fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .catch((error) => console.error("Error fetching products:", error));
  };

  const handleSearch = (searchText) => {
    if (searchText.trim() === "") {
      setFilteredProducts([]);
    } else {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchText.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const addProduct = (product) => {
    return fetch("http://localhost:3000/addProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .catch((error) => console.error("Error adding product:", error));
  };

  const deleteProduct = (productId) => {
    return fetch(`http://localhost:3000/deleteProduct/${productId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .catch((error) => console.error("Error deleting product:", error));
  };

  const updateProduct = (productId, updatedProduct) => {
    return fetch(`http://localhost:3000/updateProduct/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((response) => response.json())
      .catch((error) => console.error("Error updating product:", error));
  };

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
        <WishlistProvider userId={userId}>
        <Navbar handleSearch={handleSearch} />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Slider />
                  <LatestProducts products={filteredProducts.length > 0 ? filteredProducts : products} />
                </>
              }
            />
            <Route path="/register" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
            <Route path="/low-top" element={<Lowtop products={filteredProducts.length > 0 ? filteredProducts : products} />} />
            <Route path="/mid-top" element={<Midtop products={filteredProducts.length > 0 ? filteredProducts : products} />} />
            <Route path="/high-top" element={<HighTop products={filteredProducts.length > 0 ? filteredProducts : products} />} />
            <Route path="/sports" element={<Sports products={filteredProducts.length > 0 ? filteredProducts : products} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
            <Route path="/orders/:userId" element={<ProtectedRoute><Orders/></ProtectedRoute>} /> 
            <Route
              path="/dashboard/*"
              element={
                <AdminProtectedRoute>
                  <Dashboard
                    addProduct={addProduct}
                    fetchProducts={fetchProducts}
                    deleteProduct={deleteProduct}
                    updateProduct={updateProduct}
                  />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/allproducts"
              element={<Allproducts products={filteredProducts.length > 0 ? filteredProducts : products} />}
            />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/footer" element={<Footer />} />
          </Routes>
          <Footer />
          <ToastContainer />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}     

export default App;
