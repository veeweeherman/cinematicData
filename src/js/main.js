'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Tabs = require('react-simpletabs');

var actors = require('./data.js');
console.log('actors??',actors);
//
//
// var data = [
//   { title: "Actors", content: "I am the content of the first tab." },
//   { title: "Movies", content: "I am the content of the second tab." },
//   { title: "Directors", content: "Third tab, buddy." }
// ];
//
// var Tabs = React.createClass({
//   getInitialState: function() {
//     return {activeTab: 0};
//   },
//   handleClick: function(index) {
//     this.setState({activeTab: index});
//     return false;
//   },
//   render: function() {
//     return (
//       <div>
//         <dl className="tabs">
//           {this.props.data.map(function (tab, index) {
//             var activeClass = this.state.activeTab === index ? 'active' : '';
//
//             return (
//               <dd className={'tab ' + activeClass} >
//                 <a href="#" onClick={this.handleClick.bind(this, index)}>{tab.title}</a>
//               </dd>
//             )
//           }, this)}
//         </dl>
//         <div className="tabs-content">
//           {this.props.data.map(function (tab, index) {
//             var activeClass = this.state.activeTab === index ? 'active' : '';
//
//             return (
//               <div className={'content ' + activeClass}>
//                 <p>{tab.content}</p>
//               </div>
//             )
//           }, this)}
//         </div>
//       </div>
//     );
//   }
// });
//
// ReactDOM.render(
//   <Tabs data={data} />,
//   document.getElementById('tabs')
// );





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
      <Tabs tabActive={1} onBeforeChange={this.onBeforeChange} onAfterChange={this.onAfterChange} onMount={this.onMount}>

          {this.state.categories.map(function(category,i){
            return <CategoriesList key={i} categories={category} title={category}/>;
          })}

      </Tabs>
    );
  }
});


var CategoriesList = React.createClass({
  render: function(){
    console.log('hello???', this.props.categories);
      return (

        <Tabs.Panel title={this.props.categories}>
          <h2>list list list {this.props.categories}</h2>
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
