import React, { Component } from 'react'

class DemoItem extends Component {
  componentDidMount () {
  }

  render () {
    return (
      <li key={this.props.did} className='ListItem'>
        {this.props.date.slice(0, 10)}, {this.props.rating}
      </li>
    )
  }
}

export default DemoItem
