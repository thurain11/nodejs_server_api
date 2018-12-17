const express = require("express");
const fs = require("fs");
const hbs = require("hbs");

const app = express();

hbs.registerPartials(__dirname + "/views/master");
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));

//Middleware Function
app.use((req, res, next) => {
  var now = new Date().toString();
  console.log(`${now} . ${req.method}`);
    fs.appendFileSync("server.log", now + '\n', (err)=>{
        console.log('Server.log file is not Open');
  });
  next();
});

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});


app.get("/", function(req, res) {
  res.render("home.hbs", {
    welcomeMessage: "Welcome to My Website"
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    welcomeMessage: "Welcome to About Page"
  });
});

app.get("/contant", (req, res) => {
  res.render("contant.hbs", {
    welcomeMessage: "This is Contant Page"
  });
});

app.listen(3000, () => {
  console.log("Server is running...");
});
