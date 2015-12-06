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
      <ul>
        {this.state.categories.map(function(category, i){
          return <ShowList key={i} categories={category}/>
        })}
      </ul>
    );
  }

});
      // <div>
      //   <h3> iMDVy </h3>
      //   <ShowList categoryNames={this.state.categories} />
      // </div>

var ShowList = React.createClass({
  render: function(){
      return <li> {this.props.categories} </li>;
  }

});


ReactDOM.render(<Categories />,document.getElementById('app'));
