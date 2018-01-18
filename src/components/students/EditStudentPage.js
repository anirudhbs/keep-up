import React, { Component } from 'react'
import { getAccessToken } from '../../AuthService'

class EditStudentPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: this.props.getCurrentStudent().name
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    this.setState({name: event.target.value})
  }

  handleSubmit (event) {
    this.editStudent()
  }

  editStudent () {
    const url = 'http://localhost:8080'
    fetch(url + '/student/' + this.props.getCurrentStudent().id, {
      method: 'post',
      headers: {
        'Content-Type': 'application/Json',
        Authorization: `Bearer ${getAccessToken()}`
      },
      body: JSON.stringify(this.state)
    })
    .then((results) => {
      return results.json()
    })
    .then((data) => {
      console.log(data)
      this.props.history.push('/student/' + this.props.getCurrentStudent().id)
    })
    .catch(function (error) {
      console.log('fail', error)
    })
  }

  onCancel () {
    this.props.history.push('/student/' + this.props.getCurrentStudent().id)
  }

  render () {
    return (
      <div className='AddStudentPage'>
        <h2>Edit Student</h2>
        <div>Name</div>
        <input type='text' value={this.state.name} onChange={this.handleChange} />
        <div>
          <button onClick={this.handleSubmit}>Submit</button>
          <button onClick={this.onCancel.bind(this)} className='cancelButton' >Cancel</button>
        </div>
      </div>
    )
  }
}

export default EditStudentPage
