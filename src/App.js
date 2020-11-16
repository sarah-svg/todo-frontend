import React, { Component } from 'react'
import './App.css';
import {
  BrowserRouter as Router, 
  Route, 
  Switch,
} from 'react-router-dom';
import SignIn from './SignIn.js';
import SignUp from './SignUp.js';
import Todos from './Todos.js';
import PrivateRoute from './PrivateRoute.js';

export default class App extends Component {

  state = {
    email: localStorage.getItem('EMAIL') || '',
    token: localStorage.getItem('TOKEN') || ''
  }

  updateEmailAndToken = (email, token) => {
    this.setState({
      email: email,
      token: token
    })
    localStorage.setItem('EMAIL', email);
    localStorage.setItem('TOKEN', token);
  }

  logout = () => {
    this.setState({
      email: '',
      token: ''
    })
    localStorage.setItem('EMAIL', '');
    localStorage.setItem('TOKEN', '');
  }
  render(){
    return (
      <div className="App">
        <header className="App-link">
        <Router>
              <Switch>
                <Route 
                  path="/" 
                  exact
                  render={(routerProps) => <SignIn {...routerProps} updateEmailAndToken={this.updateEmailAndToken}/>} 
                  />
                <Route 
                  path="/signup" 
                  exact
                  render={(routerProps) => <SignUp {...routerProps} updateEmailAndToken={this.updateEmailAndToken}/>} 
                  />
                  <PrivateRoute 
                  token = {this.state.token}
                  path="/todo" 
                  exact
                  render={(routerProps) => <Todos {...routerProps} email={this.state.email} token={this.state.token} logout={this.logout}/>} 
                  />
              </Switch>
          </Router>
        </header>
      </div>
    )
  }
}
