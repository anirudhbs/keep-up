import React, { Component } from 'react'
import ListOfProjects from './ListOfProjects'
import ListOfDemos from './ListOfDemos'
import ListOfLeaves from './ListOfLeaves'

class StudentPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentStudentId: null
    }
  }

  deleteStudent () {
    const url = 'http://localhost:8080'
    fetch(url + `/student/${this.state.currentStudentId}`, {
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
    this.setState({currentStudentId: this.props.getCurrentStudent().id})
  }

  editStudent () {
    this.props.history.push('/edit/student' + this.props.getCurrentStudent().id)
  }

  render () {
    return (
      <div>
        <h2>{this.props.getCurrentStudent().name}</h2>
        <hr />
        <ListOfProjects id={this.state.currentStudentId} />
        <hr />
        <ListOfDemos id={this.state.currentStudentId} />
        <hr />
        <ListOfLeaves id={this.state.currentStudentId} />
        <hr />
        <button onClick={this.editStudent.bind(this)} className='editButton'>Edit</button>
        <button onClick={this.deleteStudent.bind(this)} className='deleteButton'>Delete</button>
      </div>
    )
  }
}

export default StudentPage
