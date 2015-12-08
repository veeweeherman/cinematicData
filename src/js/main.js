'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Tabs = require('react-simpletabs');
var update = require('react-addons-update');

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
      director: [],
      actor: []
    }
  },
  // handleClick: function() {
  //     $.ajax({
  //         url: '../pseudoDB/directors.json',
  //         dataType: 'json',
  //         success: function(data) {
  //
  //             this.setState({data: data});
  //             console.log('component will mount data HOW MANY TIMES?',data, this.state);
  //         }.bind(this),
  //         error: function(xhr, status, error) {
  //             var err = JSON.parse(xhr.responseText);
  //             console.log(err.Message);
  //         }
  //     });
  // }.bind(this),
  handleClick: function(){

//maybe should move the following back to above the second ajax call
    var movieID = this.props.id; //returns string "00000000X"
    var matchingActorIDs = [];
    var matchingActorNames = [99];


//

    // // get director's last name of the movie clicked
    var moviesDirectorIDindex = this.props.directorID-1;
    var moviesdirectorName;




          $.getJSON( "../pseudoDB/directors.json", function(data) {
          // console.log('matching movie with director ',data[moviesDirectorIDindex].firstName,data[moviesDirectorIDindex].lastName);
          // this.setState(function(){return {director: 'BLAHABLH',actor:'BLAHBLAH'}}, function(){console.log('set state has been completed',this.state);});

          moviesdirectorName = data[moviesDirectorIDindex].lastName;
          console.log('moviesdirectorName',moviesdirectorName);
          this.setState(function(){
            return update(this.state,{director: {$set: moviesdirectorName}});
          },function(){console.log('updated state?',this.state)})

          // var obj = {a: 5, b: 3}; //this.state
          // var newObj = update(obj, {b: {$apply: function(x) {return x * 2;}}});
          // => {a: 5, b: 6}
          // var newObj2 = update(obj, {b: {$set: obj.b * 2}});
        }.bind(this));
    // }





    console.log('this in handleclick scope',this);
    // get the actor(s) in the movie clicked
    var thisMovie = this;
    $.getJSON( "../pseudoDB/linkActorsToMovies.json", function(data) {
      console.log('this in linkActors json',this);
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
      $.getJSON( "../pseudoDB/actors.json", function(eata) {
        for (var i = 0; i < matchingActorIDs.length; i++) {
          var actorsInCurrentMovie = eata[matchingActorIDs[i]];
          console.log('actorsInCurrentMovie',actorsInCurrentMovie.firstName,actorsInCurrentMovie.lastName);
          matchingActorNames.push(actorsInCurrentMovie.lastName);
        }
        console.log('matchingActorNames',matchingActorNames);

        thisMovie.setState(function(){
          return update(thisMovie.state,{actor: {$set: matchingActorNames}});
        },function(){console.log('updated state?',this.state)})
      })
      console.log('matchingActorNames',matchingActorNames);

    }.bind(this));





  },

  render: function() {

    return (
      <div id="finding" onClick={this.handleClick}>
        {this.props.name}, {this.props.releaseYear}, {this.props.rating}, {this.props.genre}, id: {this.props.id}, {this.props.directorID}
        <RelatedMovieDetails director={this.state.director}  actor={this.state.actor}></RelatedMovieDetails>
      </div>
    );
  }
});




var RelatedMovieDetails = React.createClass({
  render: function(){
    return (<p>{this.props.director} ... {this.props.actor} </p>);
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
