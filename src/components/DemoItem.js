import React, { Component } from 'react'

class DemoItem extends Component {
  componentDidMount () {
  }

  render () {
    return (
      <li key={this.props.id} className='ListItem' onClick={this.showDetails.bind(this)}>
        {this.props.repo}
      </li>
    )
  }
}

export default DemoItem
