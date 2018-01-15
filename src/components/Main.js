import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import ListOfStudents from './ListOfStudents'
import StudentPage from './StudentPage'
import ProjectPage from './ProjectPage'
import AddStudentPage from './AddStudentPage'
import AddProjectPage from './AddProjectPage'
import EditProjectPage from './EditProjectPage'
import EditStudentPage from './EditStudentPage'
import DemoPage from './DemoPage'
import AddDemoPage from './AddDemoPage'

class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      students: [],
      currentStudentId: null,
      currentStudentName: null,
      currentProjectId: null,
      currentDemoId: null
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

  getCurrentProject () {
    return {id: this.state.currentProjectId}
  }

  setCurrentDemo (id) {
    this.setState({ currentDemoId: id })
  }

  getCurrentDemo () {
    return { id: this.state.currentDemoId }
  }

  render () {
    return (
      <main>
        <Switch>
          <Route exact path='/' render={(props) => <ListOfStudents students={this.state.students}
            openStudentsPage={this.setCurrentStudent.bind(this)} fetchData={this.fetchData.bind(this)} />} />
          <Route exact path='/student/:id' render={(props, history) =>
            <StudentPage getCurrentStudent={this.getCurrentStudent.bind(this)} history={props.history} />} />
          <Route exact path='/project/:pid' render={(props, history) =>
            <ProjectPage match={props.match} history={props.history} setCurrentProject={this.setCurrentProject.bind(this)} />} />
          <Route exact path='/add/student' component={AddStudentPage} />
          <Route exact path='/add/project' render={(props, history) =>
            <AddProjectPage getCurrentStudent={this.getCurrentStudent.bind(this)}
              history={props.history} currentProjectId={this.state.currentProjectId} />} />
          <Route exact path='/edit/project' render={(props, history) =>
            <EditProjectPage getCurrentProject={this.getCurrentProject.bind(this)} history={props.history} />} />
          <Route exact path='/edit/student/:uid' render={(props, history) =>
            <EditStudentPage getCurrentStudent={this.getCurrentStudent.bind(this)} history={props.history} />} />
          <Route exact path='/demo/:did' render={(props, history) =>
            <DemoPage setCurrentDemo={this.setCurrentDemo.bind(this)} match={props.match} history={props.history} />} />
          <Route exact path='/add/demo' render={(props, history) =>
            <AddDemoPage getCurrentStudent={this.getCurrentStudent.bind(this)} history={props.history} />} />
        </Switch>
      </main>
    )
  }
}

export default Main
