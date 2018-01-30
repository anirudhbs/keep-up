import React, { Component } from "react"
import { Link } from "react-router-dom"

class DemoItem extends Component {
  render() {
    const { did, sid, date } = this.props
    return (
      <Link to={`/students/${sid}/demos/${did}`} className="Link">
        <li key={did} className="ListItem">
          {new Date(date).toDateString()}
        </li>
      </Link>
    )
  }
}

export default DemoItem
