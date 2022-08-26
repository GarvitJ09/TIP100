import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "./store";
import { useNavigate } from "react-router-dom";
import logo from "../Assets/logo.jpeg";
const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    const res = await axios
      .post(`http://localhost:5000/api/admin/login`, {
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then((data) => localStorage.setItem("userId", data.admin._id))
      .then(() => dispatch(authActions.login()))
      .then(() => navigate("/"))
      .then((data) => console.log(data));
  };
  return (
    // <div className="login" style={{ backgroundImage: { login } }}>
    //   <form onSubmit={handleSubmit}>
    //     <h3>Sign In</h3>
    //     <div className="mb-3">
    //       <label>Email address</label>
    //       <input
    //         name="email"
    //         onChange={handleChange}
    //         type="email"
    //         className="form-control"
    //         placeholder="Enter email"
    //       />
    //     </div>
    //     <div className="mb-3">
    //       <label>Password</label>
    //       <input
    //         name="password"
    //         onChange={handleChange}
    //         type="password"
    //         className="form-control"
    //         placeholder="Enter password"
    //       />
    //     </div>
    //     <div className="d-grid">
    //       <button
    //         onSubmit={handleSubmit}
    //         type="submit"
    //         className="btn btn-primary"
    //       >
    //         Submit
    //       </button>
    //     </div>
    //   </form>
    // </div>
    <div
      className="vh-100"
      style={{
        backgroundImage:
          "linear-gradient(167deg, rgba(244,196,48,1) 29%, rgba(255,255,255,1) 48%, rgba(0,255,0,1) 83%)",
      }}
    >
      <section className="vh-100">
        <div className="container-fluid vh-100  ">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img src={logo} className="img-fluid" alt="Sample image" />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={handleSubmit}>
                <div className="d-flex flex-row align-items-center justify-content-center mb-3">
                  <p className="lead fw-normal mb-0 me-3 text-danger">
                    Sign in
                  </p>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="email address"
                  />
                  <label className="form-label text-danger" for="form3Example3">
                    Email address
                  </label>
                </div>

                <div className="form-outline mb-3">
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="password"
                  />
                  <label className="form-label text-danger" for="form3Example4">
                    Password
                  </label>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    onSubmit={handleSubmit}
                    type="submit"
                    className="btn btn-danger btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Auth;
