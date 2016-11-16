'use strict';

if (process.env.NODE_ENV === 'production')
    require('newrelic');

const PORT = process.env.PORT || 3333;

const os = require('os'),
      https = require('https'),
      express = require('express'),
      fs = require('fs'),
      RoutesConfig = require('./config/routes.conf'),
      DBConfig = require('./config/db.conf'),
      Routes = require('./routes/index'),
      app = express();


/****** USE ******/

RoutesConfig.init(app);
try{
  DBConfig.init();
}catch(err){
  console.log(err);
  gracefulShutdown();
}
Routes.init(app, express.Router());

/****** SERVER INIT ******/

const opts = {
  key: fs.readFileSync(__dirname + '/cert/server.key'),
  cert: fs.readFileSync(__dirname + '/cert/server.crt')
}

var server = https.createServer(opts, app)
  .listen(PORT, () => {
    console.log(`up and running @: ${os.hostname()} on port: ${PORT}`);
    console.log(`enviroment: ${process.env.NODE_ENV}`);
  });

/****** GRACEFULLY CLOSE (FUNCA?) ******/

if (process.platform === "win32") {
  require("readline")
    .createInterface({
      input: process.stdin,
      output: process.stdout
    })
    .on("SIGINT", function () {
      process.emit("SIGINT");
    });
}

var gracefulShutdown = function(){
  console.log("Exiting server");
  //DBConfig.close();
  server.close(function(){
    process.exit();
  })
};

process.on("SIGINT", function(){
  gracefulShutdown();
});

process.on("SIGTERM", function(){
  gracefulShutdown();
});

