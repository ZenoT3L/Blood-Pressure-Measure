const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();

app.use(express.static("Public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("body", { title: "Blood Pressure Calculator", formType: "bp" });
});

app.get("/signup", (req, res) => {
  res.render("body", { title: "Sign Up", formType: "signup" });
});

app.get("/login", (req, res) => {
  res.render("body", { title: "Login", formType: "login" });
});

app.post("/", (req, res) => {
  let input1 = req.body.input1;
  let input2 = req.body.input2;

  console.log(input1 + " " + input2);
});

app.listen(3000, (req, res) => {
  console.log("Listening on port 3000");
});
