import React, { Component } from "react"

class LeaveItem extends Component {
  render() {
    return (
      <li key={this.props.pid} className="ListItem">
        {new Date(this.props.date).toDateString()}
      </li>
    )
  }
}

export default LeaveItem
