import React, { Component } from "react"
import { getAccessToken } from "../../AuthService"
import InactiveStudentsItem from "./InactiveStudentsItem"

class InactiveStudents extends Component {
  constructor(props) {
    super(props)
    this.state = {
      students: []
    }
  }

  componentWillMount() {
    this.getInactiveStudents()
  }

  getInactiveStudents() {
    const url = "http://localhost:8080"
    fetch(url + "/students/inactive", {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })
      .then(results => results.json())
      .then(data => {
        if (data.status === "success") this.setState({ students: data.data })
      })
      .catch(function(error) {
        console.log("fail", error)
      })
  }

  render() {
    return (
      <div className="listOfStudents">
        <ul>
          {this.state.students.map(cur => (
            <InactiveStudentsItem
              key={cur.uid}
              name={cur.name}
              id={cur.uid}
              openStudentsPage={this.props.openStudentsPage}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default InactiveStudents
