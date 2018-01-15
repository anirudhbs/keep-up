import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import ListOfStudents from './ListOfStudents'
import StudentPage from './StudentPage'
import ProjectPage from './ProjectPage'
import AddStudentPage from './AddStudentPage'
import AddProjectPage from './AddProjectPage'

class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      students: [],
      currentStudentId: null,
      currentStudentName: null,
      currentProjectId: null
    }
  }

  fetchData () {
    const url = 'http://localhost:8080'
    fetch(url + '/students', {
      method: 'post'
    })
    .then((results) => {
      return results.json()
    })
    .then((data) => {
      this.setState({ students: data.data })
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

  setCurrentProject (id) {
    this.setState({ currentProjectId: id })
  }

  render () {
    return (
      <main>
        <Switch>
          <Route exact path='/' render={(props) => <ListOfStudents students={this.state.students}
            openStudentsPage={this.setCurrentStudent.bind(this)} fetchData={this.fetchData.bind(this)} />} />
          <Route exact path='/student/:id' render={(props, history) =>
            <StudentPage getCurrentStudent={this.getCurrentStudent.bind(this)} history={props.history} />} />
          <Route exact path='/project/:pid' component={ProjectPage} />
          <Route exact path='/add/student' component={AddStudentPage} />
          {/* <Route exact path='/add/project' component={AddProjectPage} /> */}
          <Route exact path='/add/project' render={(props, history) =>
            <AddProjectPage getCurrentStudent={this.getCurrentStudent.bind(this)} history={props.history} />} />
        </Switch>
      </main>
    )
  }
}

export default Main
