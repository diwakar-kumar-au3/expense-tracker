import React, { useState } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

function Login() {
  const [status, setstatus] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value,
      password = e.target.password.value;
    const value = { email, password };
    axios
      .post("http://localhost:5000/user/login", value)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        setstatus(!status);
      })
      .catch((err) => console.log(err.data));
    console.log(email, password);
  };

  const red = () => {
    if (status === true) {
      return <Redirect to="/home" />;
    }
  };
  return (
    <div className="container">
      {red()}
      {console.log(status)}

      <h4 className="text-info mb-4">Login</h4>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div class="form-group">
          <label>
            Email
            <input
              type="email"
              name="email"
              class="form-control"
              placeholder="Email"
              required
            />
          </label>
        </div>
        <div class="form-group">
          <label>
            Password
            <input
              type="password"
              name="password"
              class="form-control"
              placeholder="Password"
              required
            />
          </label>
        </div>

        <button type="submit" class="btn btn-primary">
          login
        </button>
      </form>
      <p>
        Create an Account <Link to="/signup">signup</Link>
      </p>
    </div>
  );
}
export default Login;
