'use strict';
var React = require('react');
var ReactDOM = require('react-dom');


/***************************************
HELPER FUNCTIONS
***************************************/

// converts id values that are 10-digit strings, ie '000000000X' and '00000000YZ' into numbers of X and YZ, respectively
var Numberify = function(string){
  return Number(string.slice(7,10));
}

module.exports = Numberify;
