'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Tabs = require('react-simpletabs');

var actors = require('./data.js');




var App = React.createClass({
  getInitialState: function(){
    return {
      categories: ['Actors', 'Movies', 'Directors'],
    }
  },
  onMount: function(selectedIndex, $selectedPanel, $selectedTabMenu) {
    console.log('component DUD mount, showing tab ' + selectedIndex);
  },
  onBeforeChange: function(selectedIndex, $selectedPanel, $selectedTabMenu) {
    console.log('before the tab ' + selectedIndex);
  },
  onAfterChange: function(selectedIndex, $selectedPanel, $selectedTabMenu) {
    console.log('after the tab ' + selectedIndex);
  },
  render: function() {

    return (
      <Tabs tabActive={2} onBeforeChange={this.onBeforeChange} onAfterChange={this.onAfterChange} onMount={this.onMount}>

          {this.state.categories.map(function(category,i){
            return <CategoriesList key={i} categories={category} title={category}/>;
          })}

      </Tabs>
    );
  }
});


var GetActors = React.createClass({
  getInitialState: function(){
    return {
        data: []
    };
  },
  componentDidMount: function(){
    $.getJSON( "../pseudoDB/actors.json", function(data) {
    console.log('initial success!!!!!!!!!!!!!!',data);
    if (this.isMounted()){
      this.setState({
        data: data
      });
    }
  }.bind(this));

  },

  render: function(){
    console.log('data??',this.state.data);
    return (
      <div>
        <p>GET ACTORS</p>
        <ul>
          {this.state.data.map(function(actor, i){
            return <li key={i}>{actor.firstName} {actor.lastName}, Age: {actor.age}</li>;
          })}
        </ul>
      </div>
    );
  }

});

var GetMovieNames = React.createClass({
  getInitialState: function(){
    return {
        data: [],
        status: 'off'
    };
  },
  componentDidMount: function(){
    $.getJSON( "../pseudoDB/movies.json", function(data) {

    if (this.isMounted()){
      this.setState({
        data: data,
        status: 'off'
      });
    }
  }.bind(this));

  },
  // handleClick: function(e, b, c, d){
  //   // e.preventDefault();
  //   console.log('handling click', e, b,c,d);
  // },

  render: function(){

    var movies = this.state.data.map(function(movie, i){
      return(
        <GetMovieDetails name={movie.name} releaseYear={movie.releaseYear} key={i} rating={movie.rating} genre={movie.genre}>
        </GetMovieDetails>

      );
    });
    return (<div >{movies}</div>);
  }
/* <p>{movie.releaseYear}, Genre: {movie.genre}, Rating: {movie.rating}</p>*/
});
var GetMovieDetails = React.createClass({
  handleClick: function(){
    console.log('this props?',this.props);
  },
  render: function() {

    return (
      <div onClick={this.handleClick}>
        {this.props.name}, {this.props.releaseYear}, {this.props.rating}, {this.props.genre}
      </div>
    );
  }
});

var GetDirectors = React.createClass({
  getInitialState: function(){
    return {
        data: []
    };
  },
  componentDidMount: function(){
    $.getJSON( "../pseudoDB/directors.json", function(data) {

    if (this.isMounted()){
      this.setState({
        data: data
      });
    }
  }.bind(this));

  },

  render: function(){

    return (
      <div>
        <p>GET DIRECTORS</p>
        <ul>
          {this.state.data.map(function(director, i){
            return <li key={i}>{director.firstName} {director.lastName}, Age: {director.age} </li>;
          })}
        </ul>
      </div>
    );
  }

});

var CategoriesList = React.createClass({
  render: function(){
      var currentTab;
      if (this.props.categories === 'Actors'){
        currentTab = <GetActors />
      } else if (this.props.categories === 'Movies'){
        currentTab = <GetMovieNames />
      } else {
        currentTab = <GetDirectors />
      }

      return (

        <Tabs.Panel title={this.props.categories} onClick={console.log(this.props.categories)}>
          <h2>list list list {this.props.categories}</h2>
            {currentTab}
        </Tabs.Panel>
      );
  }

});


ReactDOM.render(<App />, document.getElementById('tabs'));







//
// var Categories = React.createClass({
//   getInitialState: function(){
//     return {
//       categories: ['Actors', 'Movies', 'Directors'],
//     }
//   },
//   render: function(){
//     return (
//       <div>
//         <h3> iMDVy </h3>
//
//         <ul>
//           {this.state.categories.map(function(category, i){
//             return <ShowList key={i} categories={category}/>;
//           })}
//         </ul>
//       </div>
//     );
//   }
//
// });
//
// var ShowList = React.createClass({
//   render: function(){
//       return <li> {this.props.categories} </li>;
//   }
//
// });
//
//
// ReactDOM.render(<Categories />,document.getElementById('app'));
