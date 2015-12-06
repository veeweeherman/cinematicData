var React = require('react');
var ReactDOM = require('react-dom');
var actors = require('./data.js');
console.log('actors??',actors);

var Categories = React.createClass({
  getInitialState: function(){
    return {
      categories: ['Actors', 'Movies', 'Directors'],
    }
  },
  render: function(){
    return (
      <div>
        <h3> iMDVy </h3>
        <ShowList categoryNames={this.state.categories} />
      </div>
    )
  }

});
var ShowList = React.createClass({
  render: function(){
    var listItems = this.props.categoryNames.map(function(category){
      return <li> {category} </li>;
    });
    return (
      <div>
        <h3> Categories: </h3>
        <ul>
          {listItems}
        </ul>
      </div>
    )
  }
});


ReactDOM.render(<Categories />,document.getElementById('app'));
