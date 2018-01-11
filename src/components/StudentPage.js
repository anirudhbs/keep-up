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

  componentWillMount () {
    this.setState({currentStudentId: this.props.getCurrentStudent().id})
  }

  showDetails () {
  }

  render () {
    return (
      <div>
        <h2>{this.props.getCurrentStudent().name}</h2>
        <ListOfProjects id={this.state.currentStudentId} />
        <ListOfDemos id={this.state.currentStudentId} />
        <ListOfLeaves id={this.state.currentStudentId} />
      </div>
    )
  }
}

export default StudentPage
