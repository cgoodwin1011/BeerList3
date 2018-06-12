var express = require("express");
var app = express();
var bodyParser = require("body-parser");
// var router = express.Router();
var exphbs = require("express-handlebars");

var Beer = require("../models/beers.js");
// app.engine("handlebars", exphbs({defaultLayout: "main"}));
// app.set("view engine", "handlebars");


// Routes
module.exports = function (app) {

  // show all beers on home page
  app.get("/", function (req, res) {
    // console.log("hello");
    // res.render("reviewbeer");
    Beer.findAll({})
      .then(function (beerData) {
        var tried = [];
        var untried = [];
        for (var i = 0; i < beerData.length; i++) {
          if (beerData[i].triedIt == true) {
            tried.push(beerData[i]);
          } else {
            untried.push(beerData[i]);
          }
        }
        var hbsCandy = {
          title: "My Beers!",
          todoBeer: untried,
          doneBeer: tried
        };
        // res.send("hi");
        res.render("index", hbsCandy);
        // res.render("reviewbeer", hbsCandy);
      });
  });

  app.post("/api/newBeer", function (req, res) {
    console.log("landed");
    console.log(req.body.beer_name, req.body.brewery);
    Beer.create({
      beer_name: req.body.beer_name,
      brewery: req.body.brewery
      // genre: null, abv: null, review: null, triedIt: false, rating: null
    }).then(function () {
      console.log("back!");
      res.redirect("/");
    }).catch(function(err) {
      console.log("err");
    });
  });

  app.post("/api/removeBeer/:id", function (req, res) {
    Beer.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function () {
        res.redirect("/");
      });
  });

  app.post("/api/triedBeer/:id", function (req, res) {
    Beer.update({
      triedIt: true
    }, {
      where: {
        id: req.params.id
      }
    }).then(function () {
      res.redirect("/");
    });
  });

  app.get("/reviewbeer", function (req, res) {
    console.log("in /reviewbeer");
    res.render("reviewbeer", function(err, html) {
      console.log(html);
      res.send(html);

    });
/*    res.render("reviewbeer", {biff: "tannen"}, function(req, response) {
      console.log(response);
      res.send(response);
      // console.log(err);
      // console.log(req);
      console.log("end of res render");
      // return res;
    });
*/    console.log("out of res render -- async");
    // res.end()
    // res.redirect("/reviewBeer");
  });
  
  app.post("/api/reviewbeer", function (req, res) {
    // console.log("req.body is \n", req.body);
    res.send(req.body);
  });
};