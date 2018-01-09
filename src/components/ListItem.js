import React, { Component } from 'react'

class ListItem extends Component {
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

  render () {
    return (
      <li key={this.props.id}>
        {this.state.name}
      </li>
    )
  }
}

export default ListItem
