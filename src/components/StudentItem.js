import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class StudentItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: this.props.id,
      name: this.props.name // not necessary in state
    }
  }

  openStudentsPage () {
    this.props.openStudentsPage(this.props.id)
  }

  render () {
    return (
      <Link to={'/student/' + this.props.id}>
        <li key={this.props.id} className='ListItem' onClick={this.openStudentsPage.bind(this)}>
          {this.state.name}
        </li>
      </Link>
    )
  }
}

export default StudentItem
