import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import ListOfStudents from './ListOfStudents'
import StudentPage from './StudentPage'

class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      students: [],
      currentStudent: null
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

  setCurrentStudent (id) {
    this.setState({currentStudent: id})
  }

  getCurrentStudent () {
    return this.state.currentStudent
  }

  render () {
    return (
      <main>
        <Switch>
          <Route exact path='/' render={(props) => <ListOfStudents students={this.state.students} openStudentsPage={this.setCurrentStudent.bind(this)} />} />
          {/* <Route path='/student/:id' component={StudentPage} /> */}
          <Route path='/student/:id' render={(props) => <StudentPage getCurrentStudent={this.getCurrentStudent.bind(this)} />} />
          {/* <Route path='/placeholder' component={Placeholder}/> */}
        </Switch>
      </main>
    )
  }
}

export default Main
