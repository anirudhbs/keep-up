import React, { Component } from 'react'
import ListOfProjects from './ListOfProjects'
import ListOfDemos from './ListOfDemos'
import ListOfLeaves from './ListOfLeaves'

class StudentPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentStudentName: '',
      urlId: this.props.location.pathname.split('/')[2]
    }
  }

  getStudentName () {
    const url = 'http://localhost:8080'
    fetch(url + `/studentname/${this.state.urlId}`, {
      method: 'get'
    })
    .then((results) => {
      return results.json()
    })
    .then((data) => {
      this.setState({ currentStudentName: data.data.name })
    })
    .catch(function (error) {
      console.log('fail', error)
    })
  }

  deleteStudent () {
    const url = 'http://localhost:8080'
    fetch(url + `/student/${this.state.urlId}`, {
      method: 'delete'
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

  componentWillMount () {
    this.getStudentName()
  }

  editStudent () {
    this.props.history.push('/student/edit')
  }

  render () {
    return (
      <div>
        <h2>{this.state.currentStudentName}</h2>
        <hr />
        <div>
          <ListOfProjects id={this.state.urlId} className='pageColumn' />
          <ListOfDemos id={this.state.urlId} className='pageColumn' />
          <ListOfLeaves id={this.state.urlId} className='pageColumn' />
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
