import React, { useState, useEffect } from "react";
import { JsonToExcel } from "react-json-excel";
import $ from "jquery";

import Pdf from "react-to-pdf";

import axios from "axios";
import { Link } from "react-router-dom";
const ref = React.createRef();
function Display() {
  const [display, setdisplay] = useState([]);
  const [data, setdata] = useState(null);
  const [total, settotal] = useState();
  const [exceldata, setexceldata] = useState(null);

  const [enableDownload, setEnableDownload] = useState(false);
  useEffect(() => {
    let temp = [];
    if (data) {
      data.map((d) => {
        const { expense, description, category, date } = d;
        if (expense && description && category && date) {
          temp.push({ expense, description, category, date });
        }
      });
      setexceldata(temp);
    }
  }, [data]);

  var filename = "Excel-file";
  var fields = {
    expense: "Expense",
    description: "Description",
    category: "Category",
    date: "Date",
  };
  var style = {
    padding: "5px",
  };
  useEffect(() => {
    $(".csv").html("Download Excel");
  }, []);
  useEffect(() => {
    const email = JSON.parse(localStorage.getItem("user")).email;
    axios
      .get(`http://localhost:5000/getdata/${email}`)
      .then((res) => {
        console.log(res);
        setdisplay(res.data);

        // setdata(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  var catlist = display
    .map((i) => i.category)
    .filter((k) => k !== undefined)
    .reduce(
      (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
      []
    );

  const handleClick = (sel) => {
    setdata(display.filter((i) => i.category === sel));

    cal(sel);
  };

  var handleall = () => {
    var des = display.filter((o) => o.category !== undefined);

    setdata(des);
    var total = display
      .map((q) => q.expense)
      .filter((k) => k !== undefined)
      .reduce((acc, sum) => parseInt(acc) + parseInt(sum));
    settotal(total);
  };
  var cal = (sel) => {
    var total = display
      .filter((l) => l.category == sel)
      .map((q) => q.expense)
      .filter((k) => k !== undefined)
      .reduce((acc, sum) => parseInt(acc) + parseInt(sum));
    settotal(total);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-center col-12 py-3">
            <Pdf targetRef={ref} filename="code-example.pdf">
              {({ toPdf }) => (
                <button onClick={toPdf} className="btn btn-primary mx-3 btn-sm">
                  Download as Pdf
                </button>
              )}
            </Pdf>
            {/* {exceldata ? (
              
            ) : null} */}
            <button
              onClick={(e) => {
                setEnableDownload(true);
              }}
            >
              Generate Excel File
            </button>
            {enableDownload ? (
              <button
                style={{
                  color: "transparent",
                }}
                className="btn rounded-0 p-0 m-0 btn-primary mx-3 btn-sm"
                onClick={(e) => {
                  $(".csv").click();
                  setEnableDownload(false);
                }}
              >
                <JsonToExcel
                  data={exceldata}
                  className="csv btn rounded-0 p-0 m-0 btn-primary mx-3 btn-sm"
                  filename={filename}
                  fields={fields}
                  style={style}
                />
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <div
        className="container py-3"
        ref={ref}
        style={{ height: "842px", width: "780px" }}
      >
        <div className="card">
          <div className="d-flex justify-content-around mt-3">
            <h5 className="text text-info">Your Expenditure/Income</h5>
            <Link to="/logout">Logout</Link>
          </div>
          <hr />
          <div>
            <hr />
            <h5 className="text text-info">Income</h5>
            <hr />
            {display ? (
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">S.N.</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {display
                    .filter((o) => o.category == undefined)
                    .map((n, m) => {
                      return (
                        <tr>
                          <th scope="row">{m + 1}</th>
                          <td>{n.income}</td>
                          <td>{n.description}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            ) : null}
            {display ? (
              <div className="card">
                Total Income=
                {display
                  .filter((d) => d.category == undefined)
                  .map((j) => j.income)
                  .reduce((acc, sum) => parseInt(acc) + parseInt(sum), 0)}
              </div>
            ) : null}
          </div>
          <hr />
          <h5 className="text text-info"> Expense</h5>
          <hr />
          <div className="d-flex justify-content-around">
            <p onClick={() => handleall()}>All Expenses</p>
            {catlist.map((i) => (
              <p onClick={() => handleClick(i)}>{i}</p>
            ))}
          </div>
          {/* <div > */}

          <div>
            {data ? (
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">S.N.</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Description</th>
                    <th scope="col">Category</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((v, i) => {
                    return (
                      <tr>
                        <th scope="row">{i + 1}</th>
                        <td>{v.expense}</td>
                        <td>{v.description}</td>
                        <td>{v.category}</td>
                        <td>{v.date}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : null}
          </div>
          {total ? <div className="card">Total Expenditure={total}</div> : null}
          {/* </div> */}
        </div>
      </div>
    </>
  );
}
export default Display;
