import React, { useState } from "react";
import axios from "axios";

function Expense({ flag, setflag }) {
  const expensesTypes = ["Food", "Transport", "Entertainment", "Grocery"];
  const [expense, setexpense] = useState("");
  const [description, setdecription] = useState("");
  const [category, setcategory] = useState("Food");
  const [date, setdate] = useState();
  const handleClick = () => {
    const data = {
      expense: expense,
      description: description,
      category: category,
      date: date,
      email: JSON.parse(localStorage.getItem("user")).email,
    };
    axios
      .post(`http://localhost:5000/expensedata`, data)
      .then((res) => res)
      .catch((error) => {
        console.log(error);
      });
    // setflag(!flag);

    // setdisplay([...display, { expense, description, category, date }]);

    console.log(expense, description, category, date);
  };
  return (
    <>
      {/* {console.log(expense, description, category)} */}
      <h5>Add Expense</h5>

      <div class="form-group">
        <label>
          Amount
          <input
            type="number"
            name="expense"
            class="form-control"
            placeholder="Expense"
            onChange={(e) => {
              setexpense(e.target.value);
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

      <label>Category</label>
      <div class="form-group">
        <select
          onChange={(e) => {
            setcategory(e.target.value);
          }}
        >
          {expensesTypes.map((e) => {
            return <option>{e}</option>;
          })}
        </select>
      </div>
      <div class="form-group">
        <label>
          Date
          <input
            type="date"
            name="date"
            class="form-control"
            placeholder="Date"
            onChange={(e) => {
              setdate(e.target.value);
            }}
            required
          />
        </label>
      </div>
      <button
        type="click"
        class="btn btn-primary"
        onClick={() => {
          handleClick();
        }}
      >
        Add
      </button>

      {/* <div className="card"></div> */}
    </>
  );
}
export default Expense;
