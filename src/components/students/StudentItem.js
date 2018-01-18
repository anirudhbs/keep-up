import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class StudentItem extends Component {
  openStudentsPage () {
    this.props.openStudentsPage(this.props.id, this.props.name)
  }

  render () {
    return (
      <Link to={'/student/' + this.props.id} className='Link'>
        <li className='ListItem' onClick={this.openStudentsPage.bind(this)}>
          {this.props.name}
        </li>
      </Link>
    )
  }
}

export default StudentItem
