var React = require('react');
var ReactDOM = require('react-dom');
var actors = require('./data.js');
console.log('actors??',actors);

var HelloWorld = React.createClass({

  render: function() {
    return (
      <div><h1>
        Hello, world OH HAYYYY!!!!!
      </h1></div>
    );
  }
});



    ReactDOM.render(
      <HelloWorld />,
      document.getElementById('main')
    );
