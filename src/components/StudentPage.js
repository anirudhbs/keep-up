import React, { Component } from 'react'
import ListOfProjects from './ListOfProjects'
import ListOfDemos from './ListOfDemos'

class StudentPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentStudentId: null
    }
  }

  componentWillMount () {
    this.setState({currentStudentId: this.props.getCurrentStudent()})
  }

  showDetails () {
    console.log('clicked!')
  }

  render () {
    return (
      <div>
        {this.props.getCurrentStudent()}
        <ListOfProjects id={this.state.currentStudentId} />
        <ListOfDemos id={this.state.currentStudentId} />
        {/* <ListOfLeaves id={this.state.currentStudentId} /> */}
      </div>
    )
  }
}

export default StudentPage
