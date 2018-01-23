import React, { Component } from 'react'
import { getAccessToken } from '../../AuthService'

class EditStudentPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      info: {
        name: '',
        status: true
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount () {
    this.getStudentDetails()
  }

  handleChange (event) {
    const state = this.state
    state.info.name = event.target.value
    this.setState({state})
  }

  handleSubmit (event) {
    this.editStudent()
  }

  editStudent () {
    const url = 'http://localhost:8080'
    fetch(url + '/student/' + this.state.info.uid, {
      method: 'post',
      headers: {
        'Content-Type': 'application/Json',
        Authorization: `Bearer ${getAccessToken()}`
      },
      body: JSON.stringify(this.state.info)
    })
    .then((results) => results.json())
    .then((data) => {
      this.props.history.push('/student/' + this.state.info.uid)
    })
    .catch(function (error) {
      console.log('fail', error)
    })
  }

  getStudentDetails () {
    const url = 'http://localhost:8080'
    fetch(url + '/student/' + this.props.getCurrentStudent().id, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })
    .then((results) => results.json())
    .then((data) => {
      console.log(data)
      this.setState({info: data.data})
    })
    .catch(function (error) {
      console.log('fail', error)
    })
  }

  onCancel () {
    this.props.history.push('/student/' + this.state.info.uid)
  }

  handleChangeStatus (event ) {
    const state = this.state
    state.info.status = event.target.value
    this.setState({state})
  }

  render () {
    const { info } = this.state
    return (
      <div>
        <h2>Edit Student</h2>
        <div>Name</div>
        <input type='text' value={info.name} onChange={this.handleChange} />
        <div>Status</div>
        <div>
          <select value={info.status} onChange={this.handleChangeStatus.bind(this)}>
            <option value={true}>true</option>
            <option value={false}>false</option>
          </select>
        </div>
        <div>
          <button onClick={this.handleSubmit}>Submit</button>
          <button onClick={this.onCancel.bind(this)} className='cancelButton' >Cancel</button>
        </div>
      </div>
    )
  }
}

export default EditStudentPage
