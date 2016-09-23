var express       = require("express");
var env           = require("dotenv").config();
var app           = express();
var cons          = require("consolidate");
var bodyParser    = require('body-parser');
var errorhandler  = require('errorhandler');
var Redis         = require("ioredis");
var redis         = new Redis();
var ghost         = require("ghost");
var path          = require("path");
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
app.set("port", (process.env.PORT || process.argv[2] || 5000));
app.use(express.static(__dirname + "/public/"));

var options = {
  config: path.join(__dirname, '/public/config.js')
}

app.get("/portfolio", function(req, res){
  res.render("main.html");
})

app.use("/api", require("./app/api"));

ghost(options)
  .then((ghostServer) => {
    app.use("/", ghostServer.rootApp);
    ghostServer.start(app);
  })

if(process.env.NODE_ENV == "production"){
  server = app.listen(app.get("port"),"216.70.82.169", connected);
}
else{
  server = app.listen(app.get("port"), connected);
}