'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Tabs = require('react-simpletabs');
var update = require('react-addons-update');

var Numberify = require('./data.js');



/***************************************
PARENT COMPONENT, LOGIC HERE IS FROM REACT SIMPLE TABS NPM MODULE
SEE:
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
    // return (
    //   <div>
    //     <p>GET DIRECTORS</p>
    //     <ul>
    //
    //       {this.state.data.map(function(director, i){
    //         return <li key={i}>{director.firstName} {director.lastName}, Age: {director.age} </li>;
    //       })}
    //     </ul>
    //   </div>
    // );
  }

});

var GetDirectorDetails = React.createClass({
  getInitialState: function(){
    return {
      movieDirected: [],
      // movieActedIn: '',
      // actorWorkedWith: []
    }
  },
  //
  componentDidMount: function(){
    var directorIDString = this.props.id; //DOESNT WORK
    var directorIDNumber;
    var moviesDirected = [];


    /***************************************
    get movie's name the director has directed
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
    // get the actor(s) in the movie clicked
    ***************************************/
    // var thisMovie = this;
    // $.getJSON( "../pseudoDB/linkActorsToMovies.json", function(data) {
    //   for (var i = 0; i < data.length; i++) {
    //     var currentMovieID = data[i].movieID;
    //     if (currentMovieID === movieID){
    //       var actorIDindex = "";
    //       for (var j = 8; j < 10; j++) {
    //         actorIDindex += data[i].actorID[j];
    //       }
    //       matchingActorIDs.push((Number(actorIDindex)-1));
    //     }
    //   }
    //   $.getJSON( "../pseudoDB/actors.json", function(eata) {
    //     for (var i = 0; i < matchingActorIDs.length; i++) {
    //       var actorsInCurrentMovie = eata[matchingActorIDs[i]];
    //       //console.log('actorsInCurrentMovie',actorsInCurrentMovie.firstName,actorsInCurrentMovie.lastName);
    //       matchingActorNames.push(actorsInCurrentMovie.lastName);
    //     }
    //     thisMovie.setState(function(){
    //       return update(thisMovie.state,{actor: {$set: matchingActorNames}});
    //     },function(){console.log('updated state?',this.state)})
    //   })
    // }.bind(this));
  },
  render: function() {

        /* director's details {this.props.name}, {this.props.releaseYear}, {this.props.rating}, {this.props.genre}, id: {this.props.id}, {this.props.directorID} */
        // {this.props}
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
    return (<p>{this.props.movieDirected} ...  </p>);
  }
})

/***************************************
^ DIRECTOR COMPONENTS
***************************************/


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
      director: [],
      actor: []
    }
  },

  componentDidMount: function(){
    var movieID = this.props.id; // returns string "000000000X" or "00000000XX"
    var matchingActorIDs = [];
    var matchingActorNames = [];
    var moviesDirectorIDindex = this.props.directorID-1;
    var moviesDirectorName;

    /***************************************
    // get director's last name of the movie clicked
    ***************************************/
    $.getJSON( "../pseudoDB/directors.json", function(data) {

      moviesDirectorName = data[moviesDirectorIDindex].lastName;

      this.setState(function(){
        return update(this.state,{director: {$set: moviesDirectorName}});
      })
    }.bind(this));

    /***************************************
    // get the actor(s) in the movie clicked
    ***************************************/
    var thisMovie = this;
    $.getJSON( "../pseudoDB/linkActorsToMovies.json", function(data) {
      for (var i = 0; i < data.length; i++) {
        var currentMovieID = data[i].movieID;
        if (currentMovieID === movieID){
          var actorIDindex = "";
          // following function shortens the 10-digit ID # into 1-2 digit integers
          for (var j = 8; j < 10; j++) {
            actorIDindex += data[i].actorID[j];
          }
          matchingActorIDs.push((Number(actorIDindex)-1));
        }
      }
      $.getJSON( "../pseudoDB/actors.json", function(eata) {
        for (var i = 0; i < matchingActorIDs.length; i++) {
          var actorsInCurrentMovie = eata[matchingActorIDs[i]];
          //console.log('actorsInCurrentMovie',actorsInCurrentMovie.firstName,actorsInCurrentMovie.lastName);
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
      <div id="finding" onClick={this.handleClick}>
        {this.props.name}, {this.props.releaseYear}, {this.props.genre}, Rating: {this.props.rating}
        <RelatedMovieDetails director={this.state.director} actor={this.state.actor}></RelatedMovieDetails>
      </div>
    );
  }
});

var RelatedMovieDetails = React.createClass({
  render: function(){
    return (<li>Director: {this.props.director}, Starring: {this.props.actor} </li>);
  }
})

ReactDOM.render(<App />, document.getElementById('tabs'));
