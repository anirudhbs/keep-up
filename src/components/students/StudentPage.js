import React, { Component } from 'react'
import ListOfProjects from '../projects/ListOfProjects'
import ListOfDemos from '../demos/ListOfDemos'
import ListOfLeaves from '../leaves/ListOfLeaves'
import { getAccessToken } from '../../AuthService'

class StudentPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {},
      urlId: this.props.location.pathname.split('/')[2]
    }
  }

  getStudentDetails () {
    const url = 'http://localhost:8080'
    fetch(url + `/student/${this.state.urlId}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })
    .then((results) => results.json())
    .then((data) => {
      this.setState({ data: data.data })
    })
    .catch(function (error) {
      console.log('fail', error)
    })
  }

  deleteStudent () {
    const url = 'http://localhost:8080'
    fetch(url + `/student/${this.state.urlId}`, {
      method: 'delete',
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })
    .then((results) => results.json())
    .then((data) => {
      this.props.history.push('/students')
    })
    .catch(function (error) {
      console.log('fail', error)
      this.props.history.push('/students')
    })
  }

  componentWillMount () {
    this.getStudentDetails()
  }

  editStudent () {
    this.props.history.push('/student/edit')
  }

  render () {
    return (
      <div>
        <h2>{this.state.data.name}</h2>
        <hr />
        <div className='studentPageLists'>
          <ListOfProjects id={this.state.urlId} className='pageColumn' />
          <ListOfDemos id={this.state.urlId} className='pageColumn' />
          <ListOfLeaves getCurrentStudent={this.props.getCurrentStudent} className='pageColumn' />
        </div>
        <hr />
        <div className='buttons'>
          <button onClick={this.editStudent.bind(this)} className='editButton'>Edit</button>
          <button onClick={this.deleteStudent.bind(this)} className='deleteButton'>Delete</button>
        </div>
      </div>
    )
  }
}

export default StudentPage
