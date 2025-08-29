import axios from "axios";
import React, { useState } from "react";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate =useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
     // console.log(res.data);
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center my-8">
        <div className="card bg-neutral w-96 shadow-lg">
          <div className="card-body">
            <div className="w-full text-center">
              <h2 className="card-title mb-4 inline-block">Login</h2>
            </div>

            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                value={email}
                placeholder="Enter your email"
                className="input input-bordered"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            {/* Password Field */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                value={password}
                placeholder="Enter your password"
                className="input input-bordered"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            {/* Login Button */}
            <p className="text-red-500">{error}</p>
            <div className="form-control mt-6 text-center">
              <button className="btn btn-primary" onClick={handleLogin}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
