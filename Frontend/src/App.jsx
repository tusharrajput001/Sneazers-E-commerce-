import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";

// Components Import
import Login from "./components/Login/login";
import Signup from "./components/Signup/signup";
import Navbar from "./components/Navbar/navbar";
import Slider from "./components/Slider/Slider";
import Account from "./components/Account/account";

// Context
import { AuthProvider } from "./Contexts/AuthContext";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import Allproducts from "./components/Pages/Allproducts/allproducts";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  const addProduct = (product) => {
    fetch("http://localhost:3000/addProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then(response => response.json())
      .then(newProduct => {
        setProducts([...products, newProduct]);
      })
      .catch(error => console.error("Error adding product:", error));
  };

  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Slider />
              </>
            }
          />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />
          <Route
            path="/dashboard"
            element={<Dashboard addProduct={addProduct} />}
          />
          <Route
            path="/allproducts"
            element={<Allproducts products={products} />}
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
