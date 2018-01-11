import React, { Component } from 'react'

class LeaveItem extends Component {
  componentDidMount () {
  }

  showDetails () {
  }

  render () {
    return (
      <li key={this.props.pid} className='ListItem' onClick={this.showDetails.bind(this)}>
        {this.props.date}, {this.props.reason}
      </li>
    )
  }
}

export default LeaveItem
