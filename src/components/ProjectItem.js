import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ProjectItem extends Component {
  componentDidMount () {
  }

  showDetails () {
  }

  render () {
    return (
      <Link to={'/project/' + this.props.id} className='Link'>
        <li key={this.props.id} className='ListItem' onClick={this.showDetails.bind(this)}>
          {this.props.name}
        </li>
      </Link>
    )
  }
}

export default ProjectItem
