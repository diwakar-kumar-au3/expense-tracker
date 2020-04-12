var express = require("express");
var cors = require("cors");
var MongoClient = require("mongodb").MongoClient;
var bodyParser = require("body-parser");
var db;
url =
  "mongodb+srv://dkr:1234321@cluster0-su4gt.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
  if (err) throw err;
  console.log("Database connected");
  db = client.db("expense");
});

var app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hi");
});
// insert user detail on signup
app.post("/user/signup", function (req, res) {
  db.collection("users").insertOne(req.body, function (err, result) {
    if (err) throw err;
    console.log(req.body);
    res.send(result);
  });
});
//  check for user detail during login
app.post("/user/login", (req, res) => {
  db.collection("users")
    .findOne({ email: req.body.email })
    .then((result) => {
      if (!result) {
        return res.status(400).json({ err: "no user found" });
      } else {
        if (result.password == req.body.password) {
          res.status(200).json(result);
        } else {
          res.status(400).json({ err: "password incorrect" });
        }
      }
    })
    .catch((err) => console.log(err));
  console.log(req.body);
});
// insert income data
app.post("/expdata", (req, res) => {
  console.log(req.body);

  const Data = {
    income: req.body.income,
    description: req.body.description,
    email: req.body.email,
  };

  db.collection("data").insertOne(Data, function (err, result) {
    if (err) throw err;
    console.log(req.body);
    res.send(result);
  });
});
// insert expense data
app.post("/expensedata", (req, res) => {
  console.log(req.body);

  const Data = {
    expense: req.body.expense,
    description: req.body.description,
    category: req.body.category,
    date: req.body.date,
    email: req.body.email,
  };

  db.collection("data").insertOne(Data, function (err, result) {
    if (err) throw err;
    console.log(req.body);
    res.send(result);
  });
});
// get expense data
app.get("/getdata/:email", (req, res) => {
  console.log(req.params.email);
  db.collection("data")
    .find({ email: req.params.email })
    .toArray(function (err, result) {
      if (err) throw err;
      res.send(result);
    });
});
app.listen(5000);
