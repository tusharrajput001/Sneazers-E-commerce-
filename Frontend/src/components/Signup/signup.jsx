import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Fill all fields to register");
      return;
    }
    axios
      .post("https://sneazers-e-commerce.vercel.app/", { name, email, password })
      .then((result) => {
        if (result.data.email === "") {
          setError("Fill the Form to register");
        } else {
          console.log(result);
          setSuccess(true);
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="vh-100">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div
              className="card text-black"
              style={{ borderRadius: "25px", border: "none" }}
            >
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p
                      className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4"
                      style={{ fontSize: "2.5rem" }}
                    >
                      Sign up
                    </p>

                    <form onSubmit={handleSubmit} className="mx-1 mx-md-4">
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user me-3 fa-fw"></i>
                        <div
                          data-mdb-input-init
                          className="form-outline flex-fill mb-0"
                        >
                          <input
                            type="text"
                            id="form3Example1c"
                            className="form-control form-control-lg"
                            placeholder="Name"
                            style={{ fontSize: "1.5rem" }}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope  me-3 fa-fw"></i>
                        <div
                          data-mdb-input-init
                          className="form-outline flex-fill mb-0"
                        >
                          <input
                            type="email"
                            id="form3Example3c"
                            className="form-control form-control-lg"
                            placeholder="Email"
                            style={{ fontSize: "1.5rem" }}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock  me-3 fa-fw"></i>
                        <div
                          data-mdb-input-init
                          className="form-outline flex-fill mb-0"
                        >
                          <input
                            type="password"
                            id="form3Example4c"
                            className="form-control form-control-lg"
                            placeholder="Password"
                            style={{ fontSize: "1.5rem" }}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      {/* Register Error */}
                      {error && (
                        <div className="alert alert-danger mb-4" role="alert">
                          {error}
                        </div>
                      )}
                      {/* Register Success */}
                      {success && (
                        <div className="alert alert-success mb-4" role="alert">
                          Successfully registered. Redirecting to login...
                        </div>
                      )}

                      <div className="form-check d-flex justify-content-center mb-5">
                        <label
                          className="form-check-label"
                          htmlFor="form2Example3"
                        >
                          Already have an account <Link to="/login">Login</Link>
                        </label>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="submit"
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-primary btn-lg"
                          style={{ fontSize: "1.5rem" }}
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://img.freepik.com/free-vector/completed-steps-concept-illustration_114360-5521.jpg?t=st=1714911130~exp=1714914730~hmac=42ad63cc5bf19ae041b432fd479a6dc800a4efb918e7c1d451715d04761fe042&w=740"
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
