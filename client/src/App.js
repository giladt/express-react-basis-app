import React, { Component } from 'react';
import './App.css';
import { Route, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import ProjectDetails from './components/ProjectDetails';
import Signup from './components/Signup';
import Login from './components/Login';

class App extends Component {
  state = {
    user: this.props.user
  }

  setUser = user => {
    this.setState({ user })
  }

  render() {
    return (
      <div className="App">
        <Navbar user={ this.state.user } setUser={ this.setUser } />
        {/* <Route
          exact path='/projects'
          component={Projects} 
        /> */}

        <Route
          exact 
          path='/projects'
          render={props => {
            if(this.state.user){
              return <Projects {...props} />
            } else return <Redirect to='/' />
          }} 
        />

        <Route
          exact path='/projects/:id'
          render={props => <ProjectDetails user={this.state.user} {...props} />}
        />
        <Route
          exaxt path='/signup'
          render={props => <Signup setUser={this.setUser} {...props} />}
        />
        <Route
          exaxt path='/login'
          render={props => <Login setUser={this.setUser} {...props} />}
        />
      </div>
    );
  }
}

export default App;