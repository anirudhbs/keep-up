import React, { Component } from 'react'
// import { Link } from 'react-router-dom'

class AddStudentPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      studentName: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    this.setState({studentName: event.target.value})
  }

  handleSubmit (event) {
    this.addStudent()
  }

  addStudent () {
    const url = 'http://localhost:8080'
    fetch(url + '/student/add', {
      method: 'post',
      headers: {
        'Content-Type': 'application/Json'
      },
      body: JSON.stringify(this.state)
    })
    .then((results) => {
      return results.json()
    })
    .then((data) => {
      this.props.history.push('/')
    })
    .catch(function (error) {
      console.log('fail', error)
    })
  }

  render () {
    return (
      <div className='AddStudentPage'>
        <h2>Add Student</h2>
        <div>Name</div>
        <input type='text' value={this.state.studentName} onChange={this.handleChange} />
        <div><button onClick={this.handleSubmit}>Add</button></div>
      </div>
    )
  }
}

export default AddStudentPage
