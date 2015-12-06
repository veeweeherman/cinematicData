var React = require('react');
var ReactDOM = require('react-dom');
// var actors = require('./data.js');
// console.log('actors??',actors);
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


'use strict';

var Tabs = require('react-simpletabs');
var App = React.createClass({
  onMount: function(selectedIndex, $selectedPanel, $selectedTabMenu) {
    console.log('on mount, showing tab ' + selectedIndex);
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
        <Tabs.Panel title='Tab #1'>
          <h2>Content #1</h2>
        </Tabs.Panel>
        <Tabs.Panel title='Tab #2'>
          <h2>Content #2</h2>
        </Tabs.Panel>
        <Tabs.Panel title='Tab #3'>
          <h2>Content #3</h2>
        </Tabs.Panel>
      </Tabs>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));
