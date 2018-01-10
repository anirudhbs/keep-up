import React, { Component } from 'react'
import ListOfProjects from './ListOfProjects'

class IndividualUser extends Component {
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
      </div>
    )
  }
}

export default IndividualUser
