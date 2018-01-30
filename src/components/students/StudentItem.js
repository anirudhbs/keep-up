import React, { Component } from "react"
import { Link } from "react-router-dom"

class StudentItem extends Component {
  openStudentsPage() {
    this.props.openStudentsPage(
      this.props.id,
      this.props.name,
      this.props.slackid
    )
  }

  render() {
    const { id } = this.props
    return (
      <Link to={"/students/" + id} className="Link">
        <li className="ListItem" onClick={this.openStudentsPage.bind(this)}>
          {this.props.name}
        </li>
      </Link>
    )
  }
}

export default StudentItem
