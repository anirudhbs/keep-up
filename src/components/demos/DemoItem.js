import React, { Component } from "react"
import { Link } from "react-router-dom"

class DemoItem extends Component {
  render() {
    return (
      <Link to={"/demo/" + this.props.did} className="Link">
        <li key={this.props.did} className="ListItem">
          {new Date(this.props.date).toDateString()}
        </li>
      </Link>
    )
  }
}

export default DemoItem
