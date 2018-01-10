import React, { Component } from 'react'

class ProjectItem extends Component {
  componentDidMount () {
    console.log('mounted ListItem')
  }

  showDetails () {
    console.log('clicked!')
  }

  render () {
    return (
      <li key={this.props.pid} className='ListItem' onClick={this.showDetails.bind(this)}>
        {this.props.name}
      </li>
    )
  }
}

export default ProjectItem
