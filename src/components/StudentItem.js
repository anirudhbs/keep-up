import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class StudentItem extends Component {
  render () {
    return (
      <Link to={'/student/' + this.props.id} className='Link'>
        <li className='ListItem'>
          {this.props.name}
        </li>
      </Link>
    )
  }
}

export default StudentItem
