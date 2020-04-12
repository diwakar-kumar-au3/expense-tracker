import React, { useState } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
function Signup() {
  const fields = {
    username: null,
    email: null,
    password: null,
  };
  const [status, setstatus] = useState(false);
  const [error, setError] = useState(fields);
  const valemailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    var created_At = Date.now();
    const email = e.target.email.value,
      username = e.target.username.value,
      password = e.target.password.value;
    console.log(created_At);

    const value = { email, username, password, created_At };
    axios
      .post("http://localhost:5000/user/signup", value)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));

    // console.log(email, password, username, created_At);
    redirect();
  };
  const redirect = () => {
    return <Redirect to="/" />;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        error.email = valemailRegex.test(value) ? null : "invalid email";
        break;

      case "username":
        error.username =
          value.length < 2 ? "Username must be atleast 2 characters" : null;
        break;
      case "password":
        error.password =
          value.length < 8 ? "Password must be atleast 8 characters" : null;
        break;
      default:
        break;
    }
    setError({ ...error });
  };
  const displayError = (field) => {
    return field ? <small className="text-danger ">{field}</small> : null;
  };
  const red = () => {
    if (status === true) {
      return <Redirect to="/home" />;
    }
  };
  return (
    <div className="container">
      {red()}
      {console.log(error)}
      <h4 className="text-info mb-4">signup</h4>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div class="form-group">
          <label for="inputEmail">
            Email
            <input
              type="email"
              name="email"
              class="form-control"
              placeholder="Email"
              onChange={(e) => handleChange(e)}
              required
            />
          </label>
        </div>
        {displayError(error.email)}

        <div class="form-group">
          <label for="inputEmail">
            Username
            <input
              type="text"
              name="username"
              class="form-control"
              placeholder="username"
              onChange={(e) => handleChange(e)}
              required
            />
          </label>
        </div>
        {displayError(error.username)}
        <div class="form-group">
          <label for="inputPassword">
            Password
            <input
              type="password"
              name="password"
              class="form-control"
              placeholder="Password"
              onChange={(e) => handleChange(e)}
              required
            />
          </label>
        </div>

        {displayError(error.password)}

        <div class="form-group">
          <button type="submit" class="btn btn-primary">
            Sign up
          </button>
        </div>
      </form>
      <p>
        Already have Account <Link to="/">Login</Link>
      </p>
    </div>
  );
}
export default Signup;
