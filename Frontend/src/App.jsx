import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/login";
import Signup from "./components/Signup/signup";
import Navbar from "./components/Navbar/navbar";

// Font Awesome
import "@fortawesome/fontawesome-free/css/all.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
           
      <Routes>
        <Route path="/" element={<Navbar/> }></Route>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
