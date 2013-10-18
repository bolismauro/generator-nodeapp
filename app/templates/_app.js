/* jshint node:true, indent:2, white:true, laxcomma:true, undef:true, strict:true, unused:true, eqnull:true, camelcase: false, trailing: true */
'use strict';

// enn variables
var SERVER_PORT = process.env.PORT || 3000
  ;

// npm modules
var express = require('express')
  , http = require('http')
  , path = require('path')
  , coolog = require('coolog')
  ;

// variables 
var app = express()
  , logger = coolog.logger('app.js')
  ;

app.configure(function () {
  app.set('port', SERVER_PORT);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  // app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});


app.configure('development', function () {
  app.use(express.errorHandler());
});

// routes initialization
require('./routes/site')('', app);


http.createServer(app).listen(app.get('port'), function () {
  logger.ok('Express server listening on port ' + app.get('port'));
});