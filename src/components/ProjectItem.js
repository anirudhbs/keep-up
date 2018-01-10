import React, { Component } from 'react'

class ProjectItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: this.props.id,
      repo: this.props.repo
    }
  }

  componentDidMount () {
    console.log('mounted ListItem')
  }

  showDetails () {
    console.log('clicked!')
  }

  render () {
    return (
      <li key={this.props.id} className='ListItem' onClick={this.showDetails.bind(this)}>
        {this.state.repo}
      </li>
    )
  }
}

export default ProjectItem
