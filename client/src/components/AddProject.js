import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';
import axios from 'axios';

class AddProject extends Component {

  state = {
    title: '',
    description: ''
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]:value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/projects', {
      title: this.state.title,
      description: this.state.description
    })
    .then(res => {
      this.setState({
        title: '',
        description: ''
      })
      this.props.getData();
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor='title'>Title</Form.Label>
          <Form.Control 
            type='text'
            id='title'
            name='title'
            value={this.state.title}
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='description'>Description</Form.Label>
          <Form.Control 
            type='text'
            id='description'
            name='description'
            value={this.state.description}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Button type='submit'>Add a project</Button>
      </Form>
    );
  }
}

export default AddProject;