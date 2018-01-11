import React, { Component } from 'react'

class DemoItem extends Component {
  componentDidMount () {
  }

  render () {
    return (
      <li key={this.props.did} className='ListItem'>
        {this.props.did}, {this.props.rating}
      </li>
    )
  }
}

export default DemoItem
