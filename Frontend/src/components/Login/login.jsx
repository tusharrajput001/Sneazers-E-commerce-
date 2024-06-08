import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";
import axios from "axios";
import { useAuth } from "../../Contexts/AuthContext";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loginFeedback, setLoginFeedback] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (!email || !password) {
      setError("Fill all fields to Login");
      return;
    }
    axios
      .post("http://localhost:3000/login", { email, password })
      .then((result) => {
        console.log(result);
        if (result.data === "Success") {
          setSuccess(true);
          setIsLoggedIn(true);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else if (result.data === "Failed") {
          setLoginFeedback("Incorrect Password");
        } else {
          setLoginFeedback("Email not registered");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone image"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
              Login
            </p>
            <form onSubmit={handleSubmit}>
              {/* Email input */}
              <div data-mdb-input-init className="form-outline mb-4">
                <input
                  type="email"
                  id="form1Example13"
                  className="form-control form-control-lg"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password input */}
              <div data-mdb-input-init className="form-outline mb-4">
                <input
                  type="password"
                  id="form1Example23"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Login feedback */}
              <div className="mb-4 text-center" style={{ color: "red" }}>
                {loginFeedback}
              </div>

              {/* Forgot password link */}
              <div className="d-flex justify-content-end align-items-right mb-2 ">
                <a href="#!">Forgot password?</a>
              </div>

              {/* LOGIN ERROR */}
              {error && (
                <div className="alert alert-danger mb-4" role="alert">
                  {error}
                </div>
              )}
              {/* LOGIN SUCCESS */}
              {success && (
                <div className="alert alert-success mb-4" role="alert">
                  Successfully Login. Redirecting to Home page...
                </div>
              )}

              {/* SignUp */}
              <div className="form-check d-flex justify-content-center mb-5">
                <label className="form-check-label" htmlFor="form2Example3">
                  Don't have an account <Link to="/register">Register Now</Link>
                </label>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
              >
                Sign in
              </button>

              {/* Continue with Facebook */}
              <a
                className="btn btn-primary btn-lg btn-block"
                style={{ backgroundColor: "#3b5998" }}
                href="#!"
                role="button"
              >
                <i className="fab fa-facebook-f me-2"></i>Continue with Facebook
              </a>

              {/* Continue with Twitter */}
              <a
                className="btn btn-primary btn-lg btn-block"
                style={{ backgroundColor: " #55acee" }}
                href="#!"
                role="button"
              >
                <i className="fab fa-twitter me-2"></i>Continue with Twitter
              </a>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
