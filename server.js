// var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var router = express.Router();
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

require("./controllers/beer_controllers.js")(app);

// var routes = require("./controllers/beer_controllers.js");

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");
app.set('views', path.join(__dirname, "views"));

// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

console.log("app listing on port ", PORT);
// console.log("__dirname is ", __dirname);
app.listen(PORT);




// (path.join(__dirname, "public");