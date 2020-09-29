import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import EditProject from './EditProject';

class ProjectDetails extends Component {

  state = {
    project: null,
    error: null,
    editForm: false,
    title: '',
    description: ''
  }

  getData = () => {
    const id = this.props.match.params.id;
    axios.get(`/api/projects/${id}`)
    .then(response => {
      this.setState({
        project: response.data
      })
    })
    .catch(error => {
      if(error.response.status === 404) this.setState({error: 'Not found'});
      if(error.response.status >= 500) this.setState({error: 'Internal server error'});
    })
  }

  deleteProject = () => {
    const id = this.props.match.params.id;
    axios.delete(`/api/projects/${id}`)
    .then(() => {
      this.props.history.push('/projects');
    })
    .catch(error => {
      if(error.response.status === 404) this.setState({error: 'Not found'});
      if(error.response.status >= 500) this.setState({error: 'Internal server error'});
    })
  }

  toggleEditForm = () => {
    this.setState( prevState => (
      {
        editForm: !prevState.editForm,
        title: prevState? prevState.project.title: '',
        description: prevState? prevState.project.description: ''
      }
    ));
  }

  handleChange = (e) => {
    const {name, value} = e.target;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const id = this.props.match.params.id;

    axios.put(`/api/projects/${id}`, {
      title: this.state.title,
      description: this.state.description
    })
    .then(res => {
      this.setState({
        project: res.data
      })
      this.setState({
        title: '',
        description: '',
        editForm: false
      })
    })
    .catch(err => {
      console.log(err);
    })

  }

  componentDidMount() {
    this.getData();
  }
  

  render() {

    if(this.state.error) return <div>{this.state.error}</div>;
    if(!this.state.project) return <div>Loading...</div>;

    let allowedToDelete = false;
    const user = this.props.user;
    const owner = this.state.project.owner;
    if(user && user._id === owner) allowedToDelete = true;

    return (
      <div>
        <h1>{this.state.project.title}</h1>
        <p>{this.state.project.description}</p>
        {allowedToDelete && (
          <>
            <Button variant='danger' onClick={this.deleteProject}>
              Delete Project
            </Button>
            <Button variant='success' onClick={this.toggleEditForm}>
              Edit
            </Button>
          </>
        )}
        {this.state.editForm && 
          <EditProject 
            {...this.state}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        }
      </div>
    );
  }
}

export default ProjectDetails;