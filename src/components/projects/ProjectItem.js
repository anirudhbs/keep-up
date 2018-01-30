import React, { Component } from "react"
import { Link } from "react-router-dom"

class ProjectItem extends Component {
  render() {
    const { id, sid } = this.props
    return (
      <Link to={`/students/${sid}/projects/${id}`} className="Link">
        <li key={this.props.id} className="ListItem">
          {this.props.name}
        </li>
      </Link>
    )
  }
}

export default ProjectItem
