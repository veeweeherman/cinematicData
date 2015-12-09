'use strict';
var React = require('react');
var ReactDOM = require('react-dom');


/***************************************
// HELPER FUNCTIONS
***************************************/

var Numberify = function(string){
  return Number(string.slice(7,10));
}

module.exports = Numberify;
