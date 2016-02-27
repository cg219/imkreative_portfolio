var express       = require("express");
var env           = require("dotenv").config();
var app           = express();
var cons          = require("consolidate");
var bodyParser    = require('body-parser');
var errorhandler  = require('errorhandler');
var Redis         = require("ioredis");
var redis         = new Redis();
var server;
var connected = function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log("Running Server...");
  console.log("Host: " + host);
  console.log("Port: " + port);
  console.log("Visit: http://" + host + ":" + port);
}

app.engine("html", cons.ejs);
app.set("view engine", "html");
app.set("views", __dirname + "/public/");
app.set("port", (process.env.PORT || 5000));
app.use(express.static(__dirname + "/public/"));

app.get("/", function(req, res){
  res.render("index.html");
})

app.use("/api", require("./app/api"));

app.get("*", function(req, res, next){
  var err = new Error();
  err.status = 404;

  res.render("index.html");
})

server = app.listen(app.get("port"), connected);
