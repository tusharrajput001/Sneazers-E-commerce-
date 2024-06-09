import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Font Awesome
import "@fortawesome/fontawesome-free/css/all.css";

// Components Import
import Login from "./components/Login/login";
import Signup from "./components/Signup/signup";
import Navbar from "./components/Navbar/navbar";
import Slider from "./components/Slider/Slider";
import ShowcaseHome from "./components/ShowcaseHome/ShowcaseHome";
import Account from "./components/Account/account";

//context
import { AuthProvider } from "./Contexts/AuthContext";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import Allproducts from "./components/Pages/Allproducts/allproducts";



function App() {


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
              {/* <ShowcaseHome name="High-top Sneakers"/>
              <ShowcaseHome name="Mid-top Sneakers"/>
              <ShowcaseHome name="Low-top Sneakers"/>
              <ShowcaseHome name="Slip-ons"/> */}
            </>
          }
        ></Route>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/account" element={<Account/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/allproducts" element={<Allproducts/>}></Route>
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
