// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toastify
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { useState, useEffect } from "react";

// Context
import { AuthProvider } from "./Contexts/AuthContext";
import { CartProvider } from "./Contexts/CartContext"; // Ensure CartProvider is being used

// Components Import
import Login from "./components/Login/login";
import Signup from "./components/Signup/signup";
import Navbar from "./components/Navbar/navbar";
import Slider from "./components/Slider/Slider";
import Account from "./components/Account/account";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import Allproducts from "./components/Pages/Allproducts/allproducts";
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

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const fetchProducts = () => {
    return fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .catch((error) => console.error("Error fetching products:", error));
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
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Slider />
                  <LatestProducts products={products} />
                </>
              }
            />
            <Route path="/register" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<Account />} />
            <Route path="/low-top" element={<Lowtop products={products} />} />
            <Route path="/mid-top" element={<Midtop products={products} />} />
            <Route path="/high-top" element={<HighTop products={products} />} />
            <Route path="/sports" element={<Sports products={products} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/orders" element={<Orders />} />
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <Dashboard
                    addProduct={addProduct}
                    fetchProducts={fetchProducts}
                    deleteProduct={deleteProduct}
                    updateProduct={updateProduct}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/allproducts"
              element={<Allproducts products={products} />}
            />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/footer" element={<Footer />} />
          </Routes>
          <Footer />
          <ToastContainer />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
