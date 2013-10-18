/*jshint node:true, indent:2, white:true, laxcomma:true, undef:true, strict:true, unused:true, eqnull:true, camelcase: false, trailing: true */
'use strict';

var coolog = require('coolog')
  ;

var logger = coolog.logger('routes/site.js');

module.exports = function (prefix, app) {
  
  var index = function (req, res) {
    console.log('index function called');
    logger.debug('Index function called');
    res.end();
  };


  app.get(prefix + '/', index);
};