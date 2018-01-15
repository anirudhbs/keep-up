import React, { Component } from 'react'

class AddProjectPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      uid: null,
      name: '',
      repo: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount () {
    this.setState({ uid: this.props.getCurrentStudent().id })
  }

  handleChange (event) {
    this.setState({name: event.target.value})
  }

  handleChange2 (event) {
    this.setState({repo: event.target.value})
  }

  handleSubmit (event) {
    this.addProject()
  }

  addProject () {
    const url = 'http://localhost:8080'
    fetch(url + '/project/add', {
      method: 'put',
      headers: {
        'Content-Type': 'application/Json'
      },
      body: JSON.stringify(this.state)
    })
    .then((results) => {
      return results.json()
    })
    .then((data) => {
      this.props.history.push(`/student/${this.state.uid}`)
    })
    .catch(function (error) {
      console.log('fail', error)
    })
  }

  onCancel () {
    this.props.history.push('/student/' + this.state.uid)
  }

  render () {
    return (
      <div className='AddProjectPage'>
        <h2>Add Project</h2>
        <div>Name</div>
        <input type='text' value={this.state.name} onChange={this.handleChange} />
        <div>Repository</div>
        <input type='text' value={this.state.repo} onChange={this.handleChange2.bind(this)} />
        <div>
          <button onClick={this.handleSubmit}>Add</button>
          <button onClick={this.onCancel.bind(this)} className='cancelButton' >Cancel</button>
        </div>
      </div>
    )
  }
}

export default AddProjectPage
