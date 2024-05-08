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
import HighTopHome from "./components/HighTop/HighTopHome/HighTopHome";



function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Slider />
              <HighTopHome/>
            </>
          }
        ></Route>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
