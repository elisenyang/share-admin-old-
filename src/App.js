import React, { Component } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import ViewPost from './components/ViewPost';
import {BrowserRouter as Router, Route} from 'react-router-dom'



class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Home}/>
          <Route path='/login' component={Login}/>
          <Route path='/post' component={ViewPost}/>
        </div>
      </Router>
    );
  }
}

export default App;
