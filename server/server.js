'use strict';

if (process.env.NODE_ENV === 'production')
    require('newrelic');

const PORT = process.env.PORT || 3333;

const os = require('os'),
      https = require('https'),
      express = require('express'),
      fs = require('fs'),
      RoutesConfig = require('./config/routes.conf'),
      //DBConfig = require('./config/db.conf'),
      Routes = require('./routes/index'),
      app = express();


/****** USE ******/

RoutesConfig.init(app);
//DBConfig.init();
Routes.init(app, express.Router());


/****** GRACEFULLY CLOSE (NO FUNCA) ******/

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

process.on("exit", function(code){
	console.log("quit");
	//DBConfig.close();
});
process.on("SIGINT", function(){
	console.log("process");
	process.exit(0);
});
process.on("SIGTERM", function(){
	console.log("process2");
    process.exit(0);
});

/****** SERVER INIT ******/

const opts = {
  key: fs.readFileSync(__dirname + '/cert/server.key'),
  cert: fs.readFileSync(__dirname + '/cert/server.crt')
}

app.post('/login',function(req,res){
  console.log(req.body);
  res.status(200).send({admin: false, username: req.body.username});
})

var server = https.createServer(opts, app)
     .listen(PORT, () => {
       console.log(`up and running @: ${os.hostname()} on port: ${PORT}`);
       console.log(`enviroment: ${process.env.NODE_ENV}`);
     });
