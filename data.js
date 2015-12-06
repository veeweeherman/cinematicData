
var jqxhr = $.getJSON( "pseudoDB/actors.json", function(data) {
  console.log( "success",data);
})
  .done(function(data) {
    console.log( "second success",data );
  })
  .fail(function(data) {
    console.log( "error" ,data);
  })
  .always(function(data) {
    console.log( "complete" ,data);
  });

var jqxhr2 = $.getJSON( "pseudoDB/directors.json", function(data) {
  console.log( "success",data);
})
  .done(function(data) {
    console.log( "second success",data );
  })
  .fail(function(data) {
    console.log( "error" ,data);
  })
  .always(function(data) {
    console.log( "complete" ,data);
  });

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
