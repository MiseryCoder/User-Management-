import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [formvalue, setFormvalue] = useState({
    username: "",
    email: "",
    password: "",
    repassword: "", // added repassword field
    status: "1", // set default status to "1" (Active)
  });
  const [message, setMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleInput = (e) => {
    setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formvalue.password !== formvalue.repassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    const formData = {
      username: formvalue.username,
      email: formvalue.email,
      password: formvalue.password,
      status: formvalue.status,
    };

    const res = await axios.post(
      "http://localhost/HAHAHA/Backend/user.php",
      formData
    );

    if (res.data.success) {
      setMessage(res.data.success);
      setTimeout(() => {
        navigate("/Grid");
      }, 2000);
    }
  };

  return (
    <React.Fragment>
      <div className="mt-5 container w-50">
        <div className="p-5 max-w-md mx-auto my-10 bg-white p-8 border border-zinc-300 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-zinc-700">
            Register
          </h2>
          <form
            onSubmit={handleSubmit}
            method="POST"
            className="mt-8 space-y-6"
          >
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-zinc-900"
              >
                Username:
              </label>
              <input
                type="text"
                value={formvalue.username}
                onChange={handleInput}
                placeholder="Username"
                id="username"
                name="username"
                className="form-control mb-2 text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-zinc-900"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="name@example.com"
                value={formvalue.email}
                onChange={handleInput}
                className="form-control mb-2 text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-zinc-900"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={formvalue.password}
                onChange={handleInput}
                className="form-control mb-3 text-sm"
              />
              <label
                htmlFor="repassword"
                className="block mb-2 text-sm font-medium text-zinc-900"
              >
                Re-type Password:
              </label>
              <input
                type="password"
                id="repassword"
                name="repassword"
                placeholder="Re-type Password"
                onChange={handleInput}
                className="form-control mb-3 text-sm"
              />
              {passwordError && (
                <p className="alert alert-danger">{passwordError}</p>
              )}
            </div>
            {/* Removed hidden attribute from status field */}
            <select hidden
              name="status"
              id="status"
              className="form-select"
              value={formvalue.status}
              onChange={handleInput}
              required
            >
              <option value="1">Active</option>
            </select>
            <button type="submit" className="btn btn-success shadow-none">
              Submit
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Register;
