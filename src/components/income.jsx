import React, { useState } from "react";
const axios = require("axios");
function Income({ flag, setflag }) {
  const [income, setincome] = useState("");
  const [description, setdecription] = useState("");

  const handleClick = () => {
    const data = {
      income: income,
      description: description,
      email: JSON.parse(localStorage.getItem("user")).email,
    };
    axios
      .post(`http://localhost:5000/expdata`, data)
      .then((res) => res)
      .catch((error) => {
        console.log(error);
      });
    // setflag(!flag);
    // setdisplay([...display, { income, description }]);
    console.log(income, description);
  };
  return (
    <>
      {/* {console.log(income, description)} */}
      <h5>Add Income</h5>
      <div class="form-group">
        <label>
          Amount
          <input
            type="number"
            name="income"
            class="form-control"
            placeholder="Income"
            onChange={(e) => {
              setincome(e.target.value);
            }}
            required
          />
        </label>
      </div>
      <div class="form-group">
        <label>
          Description
          <input
            type="description"
            name="description"
            class="form-control"
            placeholder="Description"
            onChange={(e) => {
              setdecription(e.target.value);
            }}
            required
          />
        </label>
      </div>
      <button
        type="button"
        class="btn btn-primary"
        onClick={() => {
          handleClick();
        }}
      >
        Add
      </button>
    </>
  );
}
export default Income;
