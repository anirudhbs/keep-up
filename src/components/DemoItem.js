import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class DemoItem extends Component {
  componentDidMount () {
  }

  render () {
    return (
      <Link to={'/demo/' + this.props.did} className='Link'>
        <li key={this.props.did} className='ListItem'>
          {this.props.date.slice(0, 10)}, {this.props.rating}
        </li>
      </Link>
    )
  }
}

export default DemoItem
