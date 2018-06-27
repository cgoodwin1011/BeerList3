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
    Beer.create({
      beer_name: req.body.beer_name,
      brewery: req.body.brewery
      
    }).then(function () {
      res.redirect("/");
    }).catch(function (err) {
      console.log("err: ", err);
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
    
    var hbsCandy = {
      beername: req.query.newBeerName,
      brewer: req.query.newBeerBrewer
    };
    res.render("reviewbeer", hbsCandy);
  });

  app.post("/reviewbeer", function (req, res) {
    console.log("in POST rev beer")
    console.log("req.body is \n", req.body);
    // res.end();

    // genre: null, abv: null, review: null, triedIt: false, rating: null
    Beer.create({
      beer_name: req.body.beerName,
      brewery: req.body.beerBrewery,
      genre: req.body.beerGenre,
      abv: req.body.beerAbv,
      triedIt: true,
      rating: req.body.beerRating,
      review: req.body.beerReview
    });
  });
};