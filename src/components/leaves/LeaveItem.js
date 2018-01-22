import React, { Component } from 'react'

class LeaveItem extends Component {
  render () {
    return (
      <li key={this.props.pid} className='ListItem'>
        {this.props.date.slice(0, 10)}, {this.props.reason}
      </li>
    )
  }
}

export default LeaveItem