// var React = require('react');
// var ReactDOM = require('react-dom');

var jqxhr = $.getJSON( "../pseudoDB/actors.json", function(data) {


  console.log('initial success!!!!!!!!!!!!!!',data);
})
  .done(function(data) {
    console.log( "second success" );
  })
  .fail(function(data) {
    console.log( "error");
  })
  .always(function(data) {
    console.log( "complete");

  });

module.exports = function(x){return "nscakjnckajnd"};


// var jqxhr2 = $.getJSON( "pseudoDB/directors.json", function(data) {
//   console.log( "success",data);
// })
//   .done(function(data) {
//     console.log( "second success",data );
//   })
//   .fail(function(data) {
//     console.log( "error" ,data);
//   })
//   .always(function(data) {
//     console.log( "complete" ,data);
//   });

// $.getJSON( "/actors.json", function( data ) {
//   console.log('djcskldnklsndknskdnk',data)
//   var items = [];
//   $.each( data, function( key, val ) {
//     items.push( "<li id='" + key + "'>" + val + "</li>" );
//   });

//   $( "<ul/>", {
//     "class": "my-new-list",
//     html: items.join( "" )
//   }).appendTo( "body" );
// });
