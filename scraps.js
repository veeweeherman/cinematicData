var MenuList = React.createClass({
    getInitialState: function() {
        return {data: []}
    },
    componentWillMount: function() {
        $.ajax({
            url: 'http://10.0.0.97:8888/public-code/data/data.json',
            dataType: 'json',
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, error) {
                var err = JSON.parse(xhr.responseText);
                console.log(err.Message);
            }
        });
    },
    render: function() {
        var list = this.state.data.map(function(menuItemProps) {
            return <MenuItem onClick={this.props.whenClicked} {...menuItemProps} key={menuItemProps.id} />
        });
        return (
            <ul id="menu-list">
                {list}
            </ul>
        )
    }
});



var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});
var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {this.props.children}
      </div>
    );
  }
});




var NavMenu = React.createClass({ //child
  getDefaultProps: function(){
    return {
        isOpen: false
    };
  },
  render: function()
  {
    if (this.props.isOpen === true){
        return (
            <div className="dropdown">
                <ul>
                    <li><a href="#">News</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Guidelines</a></li>
                    <li><a href="#">Exchange</a></li>
                    <li><a href="#">Forum</a></li>
                </ul>
            </div>
        );
    }
    return null;
  }
});

var NavMenuButton = React.createClass({ //parent
  getInitialState: function(){
      return {
          isOpen: false
      };
  },
  handleClick: function(e){
      e.preventDefault();
      if (this.state.isOpen === true){
        this.setState({isOpen: false});
      } else {
        this.setState({isOpen: true});
      }
  },
  componentDidMount: function (){
      document.body.addEventListener('click', this.handleBodyClick);
  },
  componentWillUnmount: function (){
      document.body.removeEventListener('click', this.handleBodyClick);
  },
  handleBodyClick: function(){
      this.setState({isOpen: false});
  },
  render: function(){
      return (
          <div>
              <a onClick={this.handleClick} href="#">Menu</a>
              <NavMenu isOpen={this.state.isOpen} />
          </div>
      );
  }
});

ReactDOM.render(<NavMenuButton />, document.getElementById('app'));

// display: non vs inline
var Hello = React.createClass({
    getInitialState: function(){
        return {
            color: 'blue'
        };
    },
    handleClick: function(){
        if (this.state.color === 'blue'){
            this.setState({color: 'green'});
        } else {
            this.setState({color: 'blue'});
        }
    },
    render: function() {
        return <button className={this.state.color} onClick={this.handleClick}>My background is: {this.state.color}, Click me to change</button>;
    }
});




React.render(<Hello name="World" />, document.getElementById('container'));


var Search = React.createClass({
    getInitialState: function() {
        return { showResults: false };
    },
    onClick: function() {
        // this.setState({ showResults: true });

        if (this.state.showResults === true){
          this.setState({showResults: false});
        } else {
          this.setState({showResults: true});
}
    },
    render: function() {
        return (
            <div>
                SEARCHBAR?
                <input type="submit" value="Search" onClick={this.onClick} />
                { this.state.showResults ? <Results /> : null }
            </div>
        );
    }
});

var Results = React.createClass({
    render: function() {
        return (
            <div id="results" className="search-results">
                Some Results
            </div>
        );
    }
});

ReactDOM.render(<Search />, document.getElementById('app'));












// https://jsfiddle.net/jL3yyk98/
var NavMenu = React.createClass({
        getDefaultProps: function()
        {
            return {
                isOpen: false
            };
        },

        render: function()
        {
            if (this.props.isOpen)
            {
                return (
                    <div className="dropdown">
                        <ul>
                            <li><a href="#">News</a></li>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Guidelines</a></li>
                            <li><a href="#">Exchange</a></li>
                            <li><a href="#">Forum</a></li>
                        </ul>
                    </div>
                );
            }
            return null;
        }
});

var NavMenuButton = React.createClass({

        getInitialState: function()
        {
            return {
                isOpen: false
            };
        },

        handleClick: function(e)
        {
            e.stopPropagation();
            console.log("button click", this.state.isOpen);
            this.setState({isOpen: !this.state.isOpen});
        },

        componentDidMount: function ()
        {

        },

        componentWillUnmount: function ()
        {

        },

        handleBodyClick: function(e)
        {
               this.setState({isOpen: false});
        },

        render: function(){
            var _style = {
                width: "100%",
                height: "400px",
                backgroundColor: "yellow"
            };
            return (
                <div style={_style} onClick={this.handleBodyClick}>
                    <a onClick={this.handleClick} href="#">Menu</a>
                    <NavMenu isOpen={this.state.isOpen} />
                </div>
            );
        }

    });

    React.render(<NavMenuButton />, document.getElementById('menu-button'));












var loginButton;
if (loggedIn) {
  loginButton = <LogoutButton />;
} else {
  loginButton = <LoginButton />;
}

return (
  <nav>
    <Home />
    {loginButton}
  </nav>
);



var UserGist = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      lastGistUrl: ''
    };
  },

  componentDidMount: function() {
    $.get(this.props.source, function(result) {
      var lastGist = result[0];
      if (this.isMounted()) {
        this.setState({
          username: lastGist.owner.login,
          lastGistUrl: lastGist.html_url
        });
      }
    }.bind(this));
  },

  render: function() {
    return (
      <div>
        {this.state.username} s last gist is
        <a href={this.state.lastGistUrl}>here</a>.
      </div>
    );
  }
});



















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

        <ul>
          {this.state.categories.map(function(category, i){
            return <CategoriesList key={i} categories={category}/>;
          })}
        </ul>
      </div>
    );
  }

});

var CategoriesList = React.createClass({
  render: function(){
      return <li> {this.props.categories} </li>;
  }

});


ReactDOM.render(<Categories />,document.getElementById('app'));
