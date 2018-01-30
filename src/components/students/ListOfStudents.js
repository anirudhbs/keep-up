import React, { Component } from "react"
import StudentItem from "./StudentItem"
import { getProfile } from "../../AuthService"

class ListOfStudents extends Component {
  componentWillMount() {
    this.props.fetchData()
    getProfile()
  }

  render() {
    return (
      <div className="listOfStudents">
        <h2>Students</h2>
        <ul>
          {this.props.students.map(cur => (
            <StudentItem
              key={cur.uid}
              id={cur.uid}
              name={cur.name}
              slackid={cur.slackid}
              openStudentsPage={this.props.openStudentsPage}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default ListOfStudents
