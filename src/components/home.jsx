import React from "react";

import Expense from "./expense";
import Income from "./income";
import Authorize from "./auth";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="container">
      <Authorize />
      {/* {console.log(display)} */}
      <div className="d-flex justify-content-around mt-3">
        <h5>Add your Expense</h5>
        <Link to="/logout">Logout</Link>
      </div>
      <hr />

      <div className="row">
        <div className="col">
          <Income />
        </div>
        <div className="col">
          <Expense />
        </div>
      </div>
      <Link to="/display">To View All Your Data</Link>
    </div>
  );
}
export default Home;
