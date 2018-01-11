import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import ListOfStudents from './ListOfStudents'
import StudentPage from './StudentPage'

class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      students: [],
      currentStudentId: null,
      currentStudentName: null
    }
  }

  componentDidMount () {
    const url = 'http://localhost:8080'
    fetch(url + '/students', {
      method: 'post'
    })
    .then((results) => {
      return results.json()
    })
    .then((data) => {
      this.setState({ students: data })
    })
    .catch(function (error) {
      console.log('fail', error)
    })
  }

  setCurrentStudent (id, name) {
    this.setState({currentStudentId: id, currentStudentName: name})
  }

  getCurrentStudent () {
    return { id: this.state.currentStudentId, name: this.state.currentStudentName }
  }

  render () {
    return (
      <main>
        <Switch>
          <Route exact path='/' render={(props) => <ListOfStudents students={this.state.students} openStudentsPage={this.setCurrentStudent.bind(this)} />} />
          <Route path='/student/:id' render={(props) => <StudentPage getCurrentStudent={this.getCurrentStudent.bind(this)} />} />
        </Switch>
      </main>
    )
  }
}

export default Main
