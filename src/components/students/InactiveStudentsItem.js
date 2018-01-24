import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class InactiveStudentsItem extends Component {
  openStudentsPage () {
    this.props.openStudentsPage(this.props.id, this.props.name, this.props.slackid)
  }

  render () {
    return (
      <div>
        <Link to={'/student/' + this.props.id} className='Link'>
          <li className='ListItem' onClick={this.openStudentsPage.bind(this)}>{this.props.name}</li>
        </Link>
      </div>
    )
  }
}

export default InactiveStudentsItem
