import React, { Component } from 'react';
import axios from 'axios';
import ProjectList from './ProjectList';
import AddProject from './AddProject';

class Projects extends Component {
  
  state = {
    projects: []
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    axios.get('/api/projects')
    .then(response => {
      this.setState({projects: response.data})
    })
    .catch(err => {
      console.log(err);
    })
  }
  
  render() {
    return (
      <div className='projects-container'>
        <AddProject getData={this.getData} />
        <ProjectList projects={this.state.projects} />
      </div>
    );
  }
}

export default Projects;