import React, { Component } from 'react'

class ProjectItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: this.props.id,
      name: this.props.name
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
        {this.state.name}
      </li>
    )
  }
}

export default ProjectItem
