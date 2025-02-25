const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();

app.use(express.static("Public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/Blood-Pressure");
  const bpSchema = new mongoose.Schema({
    login: { type: String, unique: true },
    password: String,
  });

  const detail = mongoose.model("detail", bpSchema);

  app.get("/", (req, res) => {
    res.render("body", {
      title: "Blood Pressure Calculator",
      formType: "bp",
      directory: "/",
    });
  });

  app.get("/signup", (req, res) => {
    res.render("body", {
      title: "Sign Up",
      formType: "signup",
      directory: "/signup",
    });
  });

  app.get("/login", (req, res) => {
    res.render("body", {
      title: "Login",
      formType: "login",
      directory: "/login",
    });
  });

  app.post("/", (req, res) => {
    let input1 = req.body.input1;
    let input2 = req.body.input2;

    if (input1 === "" || input2 === "") {
      if (input1 === "" && input2 !== "") {
        res.render("body", {
          title: "Please Enter Your Systolic Blood Pressure",
          formType: "bp",
          directory: "/",
        });
      } else if (input1 !== "" && input2 === "") {
        res.render("body", {
          title: "Please Enter Your Diastolic Blood Pressure",
          formType: "bp",
          directory: "/",
        });
      } else {
        res.render("body", {
          title: "Please Enter Your Blood Pressure",
          formType: "bp",
          directory: "/",
        });
      }
    } else {
      if (input1 < 0 || input2 < 0) {
        res.render("body", {
          title: "Please Enter A Valid Number",
          formType: "bp",
          directory: "/",
        });
      } else {
        if (input1 < 120 && input2 < 80) {
          res.render("body", {
            title: "Normal",
            formType: "bp",
            directory: "/",
          });
        } else if (input1 >= 120 && input1 <= 129 && input2 < 80) {
          res.render("body", {
            title: "Elevated",
            formType: "bp",
            directory: "/",
          });
        } else if (
          (input1 >= 130 && input1 <= 139) ||
          (input2 >= 80 && input2 <= 89)
        ) {
          res.render("body", {
            title: "Stage 1 Hypertension",
            formType: "bp",
            directory: "/",
          });
        } else if (
          (input1 >= 140 && input1 <= 180) ||
          (input2 >= 90 && input2 <= 120)
        ) {
          res.render("body", {
            title: "Stage 2 Hypertension",
            formType: "bp",
            directory: "/",
          });
        } else if (input1 > 180 || input2 > 120) {
          res.render("body", {
            title: "What Are You Doing Here, Get To A Hospital",
            formType: "bp",
            directory: "/",
          });
        }
      }
    }
  });

  app.post("/signup", async (req, res) => {
    let sEmail = req.body.input1;
    let sPassword = req.body.input2;

    const check = await detail.findOne({ login: sEmail });

    if (check) {
      res.render("body", {
        title: "Email Already Exists",
        formType: "signup",
        directory: "/signup",
      });
    } else {
      const newUser = new detail({
        login: sEmail,
        password: sPassword,
      });

      newUser.save();
      res.redirect("/");
    }
  });

  app.post("/login", async (req, res) => {
    let lEmail = req.body.input1;
    let lPassword = req.body.input2;

    const check = await detail.find({ login: lEmail });

    check.forEach((element) => {
      if ((element.login = lEmail && element.password === lPassword)) {
        res.redirect("/");
      } else {
        res.render("body", {
          title: "Invalid Email or Password",
          formType: "login",
          directory: "/login",
        });
      }
    });
  });
}

app.listen(3000, (req, res) => {
  console.log("Listening on port 3000");
});
