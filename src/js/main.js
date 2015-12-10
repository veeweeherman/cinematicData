'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Tabs = require('react-simpletabs');
var update = require('react-addons-update');

var Numberify = require('./helpers.js');



/***************************************
PARENT COMPONENT, LOGIC HERE IS FROM REACT SIMPLE TABS NPM MODULE
SEE: https://github.com/pedronauck/react-simpletabs
***************************************/
var App = React.createClass({
  getInitialState: function(){
    return {
      categories: ['Actors', 'Movies', 'Directors']
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
      <Tabs tabActive={3} onBeforeChange={this.onBeforeChange} onAfterChange={this.onAfterChange} onMount={this.onMount}>

          {this.state.categories.map(function(category,i){
            return <CategoriesList key={i} categories={category} title={category}/>;
          })}

      </Tabs>
    );
  }
});

/***************************************
ACTORS COMPONENTS
TODO: create chold components for ACTORS, for ActorDetails and RelatedActorDetails
***************************************/

var GetActors = React.createClass({
  getInitialState: function(){
    return {
        data: []
    };
  },
  componentDidMount: function(){
    $.getJSON( "../pseudoDB/actors.json", function(data) {
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

/***************************************
DIRECTORS COMPONENTS
***************************************/
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
    var directors = this.state.data.map(function(director, i){
      return (
        <GetDirectorDetails key={i} firstName={director.firstName} lastName={director.lastName} age={director.age} id={director.id}></GetDirectorDetails>
      );
    });
    return (<div>{directors}</div>);
  }

});

var GetDirectorDetails = React.createClass({
  getInitialState: function(){
    return {
      movieDirected: [],
      movieActedIn: [],
      actorWorkedWith: []
    }
  },
  //
  componentDidMount: function(){
    var directorIDString = this.props.id; // returns string "000000000X" or "00000000XX"
    var directorIDNumber;
    var moviesDirected = [];


    /***************************************
    Find the movies a director has directed
    Use the director's id (string) and Numberify it (see helper function in helpers.js)
    Iterate through the movies json object, check if any movie's directorID matches the current director's id
    If there is a match, get the name of that movie and store it in moviesDirected array
    Update state
    ***************************************/
    $.getJSON( "../pseudoDB/movies.json", function(data) {
      directorIDNumber = Numberify(directorIDString);
      for (var i = 0; i < data.length; i++) {
        if (data[i].directorID === directorIDNumber){
          moviesDirected.push(data[i].name);
        }
      }
      this.setState(function(){
        return update(this.state,{movieDirected: {$set: moviesDirected}});
      },function(){console.log('updated state?')})
    }.bind(this));

    /***************************************
    Get the actor(s) that acted in the movie

    ***************************************/

  },
  render: function() {

    return (
      <div>
        {this.props.firstName} {this.props.lastName}, Age: {this.props.age}
        <RelatedDirectorDetails movieDirected={this.state.movieDirected} ></RelatedDirectorDetails>

      </div>
    );
  }
});

var RelatedDirectorDetails = React.createClass({
  render: function(){
    return (<p>{this.props.movieDirected} ...  (Other Actors this Director worked with)</p>);
  }
})


/***************************************
SIMPLE TABS COMPONENT
***************************************/
var CategoriesList = React.createClass({
  render: function(){
    var currentTab;
    if (this.props.categories === 'Actors'){
      currentTab = <GetActors />
    } else if (this.props.categories === 'Movies'){
      currentTab = <GetMovies />
    } else {
      currentTab = <GetDirectors />
    }

    return (
      <div>
        <div id="first">
          <Tabs.Panel title={this.props.categories} onClick={console.log(this.props.categories)} >
            <h2>list list list {this.props.categories}</h2>
            {currentTab}
          </Tabs.Panel>
        </div>
        <div id="second">SECOND DIV</div>
      </div>
    );
  }

});


/***************************************
MOVIE COMPONENTS
***************************************/
var GetMovies = React.createClass({
  getInitialState: function(){
    return {
        data: []
    };
  },
  componentDidMount: function(){
    $.getJSON( "../pseudoDB/movies.json", function(data) {
      if (this.isMounted()){
        this.setState({
          data: data
        });
      }
    }.bind(this));
  },
  render: function(){

    var movies = this.state.data.map(function(movie, i){
      return(
        <GetMovieDetails name={movie.name} releaseYear={movie.releaseYear} key={i} rating={movie.rating} genre={movie.genre} id={movie.id} directorID={movie.directorID}>
        </GetMovieDetails>
      );
    });
    return (<div>{movies}</div>);
  }

});
var GetMovieDetails = React.createClass({
  getInitialState: function(){
    return {
      director: '',
      actor: []
    }
  },

  componentDidMount: function(){

    /***************************************
    Get director's last name of the movie:
    Using the movie object, use the movie's directorID to search through the Directors array for a director object with a matching id
    ** each movie's directorID number minus 1 is the index number of the same director in the directors.json array of directors
    ***************************************/
    var moviesDirectorIDindex = this.props.directorID-1;
    var moviesDirectorName;
    $.getJSON( "../pseudoDB/directors.json", function(data) {
      moviesDirectorName = data[moviesDirectorIDindex].lastName;
      this.setState(function(){
        return update(this.state,{director: {$set: moviesDirectorName}});
      })
    }.bind(this));

    /***************************************
    Get array of the actor(s) in the movie:
    First, get array of all the id's of the actor(s) in the current movie
    Each actor's id is +1 of its index in the actors.json array
    So get the name of the actor by using its id minus 1 as the index number of where its located on the actors array
    ***************************************/
    var movieIDString = this.props.id; // returns string "000000000X" or "00000000XX"
    var matchingActorIDs = [];
    var matchingActorNames = [];
    var thisMovie = this; // keep reference to scope of the current movie while inside any child scopes
    $.getJSON( "../pseudoDB/linkActorsToMovies.json", function(data) {
      for (var i = 0; i < data.length; i++) {
        var currentMovieID = data[i].movieID;
        if (currentMovieID === movieIDString){
          matchingActorIDs.push(Numberify(data[i].actorID)-1);
        }
      }
      $.getJSON( "../pseudoDB/actors.json", function(data) {
        for (var i = 0; i < matchingActorIDs.length; i++) {
          var actorsInCurrentMovie = data[matchingActorIDs[i]];
          matchingActorNames.push(actorsInCurrentMovie.lastName);
        }
        thisMovie.setState(function(){
          return update(thisMovie.state,{actor: {$set: matchingActorNames}});
        })
      })
    }.bind(this));
  },
  render: function() {

    return (
      <div>
        {this.props.name}, {this.props.releaseYear}, {this.props.genre}, Rating: {this.props.rating}
        <RelatedMovieDetails director={this.state.director} actor={this.state.actor}></RelatedMovieDetails>
      </div>
    );
  }
});

var RelatedMovieDetails = React.createClass({
  render: function(){
    return (<p>Director: {this.props.director}, Starring: {this.props.actor} </p>);
  }
})

ReactDOM.render(<App />, document.getElementById('tabs'));
