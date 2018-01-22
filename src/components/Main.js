import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import ListOfStudents from './students/ListOfStudents'
import StudentPage from './students/StudentPage'
import ProjectPage from './projects/ProjectPage'
import AddStudentPage from './students/AddStudentPage'
import AddProjectPage from './projects/AddProjectPage'
import EditProjectPage from './projects/EditProjectPage'
import EditStudentPage from './students/EditStudentPage'
import DemoPage from './demos/DemoPage'
import AddDemoPage from './demos/AddDemoPage'
import { getAccessToken } from '../AuthService'
import Callback from './Callback'
import Profile from './Profile'
import AdminPage from './AdminPage'

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
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })
    .then((results) => results.json())
    .then((data) => {
      if (data.status === 'success') this.setState({ students: data.data })
    })
    .catch(function (error) {
      console.log('fail', error)
    })
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
          <Route exact path='/students' render={(props) => <ListOfStudents students={this.state.students}
            fetchData={this.fetchData.bind(this)} />} />
          <Route path='/callback' component={Callback} />
          <Route path='/admin' component={AdminPage} />
          <Route exact path='/profile' component={Profile} />
          <Route exact path='/students/add' component={AddStudentPage} />
          <Route exact path='/student/edit' render={(props, history) =>
            <EditStudentPage getCurrentStudent={this.getCurrentStudent.bind(this)} history={props.history} />} />

          <Route path='/student/:sid' render={(props, history, location) =>
            <StudentPage history={props.history} location={props.location} />} />
          <Route exact path='/project/:pid' render={(props, history) =>
            <ProjectPage match={props.match} history={props.history} setCurrentProject={this.setCurrentProject.bind(this)} />} />
          <Route exact path='/demo/:did' render={(props, history) =>
            <DemoPage setCurrentDemo={this.setCurrentDemo.bind(this)} match={props.match} history={props.history} />} />

          <Route exact path='/projects/add' render={(props, history) =>
            <AddProjectPage getCurrentStudent={this.getCurrentStudent.bind(this)} history={props.history}
              currentProjectId={this.state.currentProjectId} />} />
          <Route exact path='/edit/project' render={(props, history) =>
            <EditProjectPage getCurrentProject={this.getCurrentProject.bind(this)} history={props.history} />} />

          <Route exact path='/demos/add' render={(props, history) =>
            <AddDemoPage getCurrentStudent={this.getCurrentStudent.bind(this)} history={props.history} />} />
        </Switch>
      </main>
    )
  }
}

export default Main
