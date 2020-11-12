import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from "react-router-dom";
import SignUp from './SignUp.js';
import Login from './Login.js';
import Home from './Home.js'
import Todos from './Todo.js';
import PrivateRoute from './PrivateRoute.js';

export default class App extends Component {
  state = {
    username: localStorage.getItem('USERNAME') || '',
    token: localStorage.getItem('TOKEN') || '',
  }

  changeTokenAndUsername = (booger1, booger2) => {
    localStorage.setItem('TOKEN', booger2);
    localStorage.setItem('USERNAME', booger1);

    this.setState({
      username: booger1,
      token: booger2
    })
  }
  logOut = () => {
    localStorage.setItem('TOKEN', '');
    localStorage.setItem('USERNAME', '');
    /////////setting to state the name and token
    this.setState({
      username: '',
      token: ''
    })

  }
  render() {
    return (
      <div>
        <Router>
          <ul>
            {
              this.state.token
                ? <div>
                  {this.state.username}
                  <button onClick={this.logOut}></button>
                </div>
                : <>
                  <Link to="/login"><div>log in</div></Link>
                  <Link to="/signup">sign up</Link>
                </>}
          </ul>
            <Switch>
              <Route exact path= '/' render={( routerProps) => <Home {...routerProps} /> } />
              <Route exact path= '/login' render={( routerProps) => <Login
                {
                ...routerProps
                } changeTokenAndUsername={this.changeTokenAndUsername} />} />
              <Route exact path='/signup' render={( routerProps) => < SignUp 
                {...routerProps}
                changeTokenAndUsername={this.changeTokenAndUsername} /> 
                } />
                <PrivateRoute token={this.state.token}
                              exact path='/todo'
                              render= {(routerProps) => <Todos {...routerProps}
                            token={this.state.token} />} />  
              </Switch>
        </Router>
      </div>
    )
  }
}
