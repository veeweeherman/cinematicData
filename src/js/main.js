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

  render: function(){

    var movies = this.state.data.map(function(movie, i){
      return(
        <GetMovieDetails name={movie.name} releaseYear={movie.releaseYear} key={i} rating={movie.rating} genre={movie.genre} id={movie.id} directorID={movie.directorID}>
        </GetMovieDetails>

      );
    });
    return (<div >{movies}</div>);
  }

});
var GetMovieDetails = React.createClass({
  getInitialState: function(){
    return {
      director: '',
      actor: ''
    }
  },
  handleClick: function(){
    // get this.props.directorID and concat with "//9 0's"
    // use this stringified number to search:
      // linkActorsToMovies.json
        // if match ID with any "movieID" : ID, get the actorID-stringify-ID and match it against actors.json IDs
      // directors.json
        // if match ID with any directorsid, then return fName and lName

    // get director's last name of the movie clicked
    var moviesDirectorIDindex = this.props.directorID-1;
    $.getJSON( "../pseudoDB/directors.json", function(data) {
      console.log('matching movie with director ',data[moviesDirectorIDindex].firstName,data[moviesDirectorIDindex].lastName);
      this.setState({
        director: data[moviesDirectorIDindex].lastName
      });
    }.bind(this));

    // get the actor(s) in the movie clicked
    var movieID = this.props.id; //returns string "00000000X"
    var matchingActorIDs = [];
    $.getJSON( "../pseudoDB/linkActorsToMovies.json", function(data) {
      console.log('links ',movieID, data);
      for (var i = 0; i < data.length; i++) {
        var currentMovieID = data[i].movieID;
        if (currentMovieID === movieID){
          var actorIDindex = "";
          for (var j = 8; j < 10; j++) {
            actorIDindex += data[i].actorID[j];
          }
          matchingActorIDs.push((Number(actorIDindex)-1));
        }
      }
      console.log('matching actors arr',matchingActorIDs);
            $.getJSON( "../pseudoDB/actors.json", function(data) {
              console.log('inside the actors file',data);
              for (var i = 0; i < matchingActorIDs.length; i++) {
                var actorsInCurrentMovie = data[matchingActorIDs[i]];
                console.log('actorsInCurrentMovie',actorsInCurrentMovie.firstName,actorsInCurrentMovie.lastName);
              }
            })
    }.bind(this));
    // var movieID = this.props.id;
    // $.getJSON( "../pseudoDB/linkActorsToMovies.json", function(data) {
    //   if (movieID.length === 11){
    //     movieID = movieID.slice(1,movieID.length);
    //   }
    //   console.log('inside the links file');
    //   for (var i = 0; i < data.length; i++) {
    //     if (data[i].movieID === movieID){
    //       console.log('actors ID in this movie ',data[i].actorID);
    //       var currentActorID = data[i].actorID;
    //       // this.setState({
    //       //   actor: data[i].lastName
    //       // });
    //       $.getJSON( "../pseudoDB/actors.json", function(data) {
    //         console.log('inside the actors file',data);
    //         for (var i = 0; i < data.length; i++) {
    //           if (data[i].id === currentActorID){
    //             console.log('actors name in this movie ',data[i].lastName);
    //         //     // this.setState({
    //         //     //   actor: data[i].lastName
    //         //     // });
    //           }
    //         }
    //       })
    //     }
    //   }
    // }.bind(this));


  },
  render: function() {

    return (
      <div id="finding" onClick={this.handleClick}>
        {this.props.name}, {this.props.releaseYear}, {this.props.rating}, {this.props.genre}, id: {this.props.id}, {this.props.directorID}
        <RelatedMovieDetails director={this.state.director}></RelatedMovieDetails>
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

var Test = React.createClass({
  render: function(){
    return (<p>TESTESTEST</p>);
  }
})

var RelatedMovieDetails = React.createClass({
  render: function(){
    return (<p>{this.props.director } </p>);
  }
})

ReactDOM.render(<App />, document.getElementById('tabs'));
// ReactDOM.render(<Test />, document.getElementById('second'));







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
