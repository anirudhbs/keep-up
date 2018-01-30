import React, { Component } from "react"

import ListOfProjects from "../projects/ListOfProjects"
import ListOfDemos from "../demos/ListOfDemos"
import ListOfLeaves from "../leaves/ListOfLeaves"
import { getAccessToken } from "../../AuthService"

class StudentPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      studentId: this.props.location.pathname.split("/")[2]
    }
  }

  getStudentDetails() {
    const { studentId } = this.state
    const url = "http://localhost:8080"
    fetch(url + `/student/${studentId}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })
      .then(results => results.json())
      .then(data => {
        this.setState({ data: data.data })
      })
      .catch(function(error) {
        console.log("fail", error)
      })
  }

  deleteStudent() {
    const { studentId } = this.state
    const url = "http://localhost:8080"
    fetch(url + `/student/${studentId}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })
      .then(results => results.json())
      .then(data => {
        this.props.history.push("/students")
      })
      .catch(function(error) {
        console.log("fail", error)
        this.props.history.push("/students")
      })
  }

  componentWillMount() {
    this.getStudentDetails()
  }

  editStudent() {
    const { studentId } = this.state
    this.props.history.push(`/students/${studentId}/edit`)
  }

  render() {
    const { studentId } = this.state
    return (
      <div>
        <h2>{this.state.data.name}</h2>
        <hr />
        <div className="studentPageLists">
          <ListOfProjects id={studentId} className="pageColumn" />
          <ListOfDemos id={studentId} className="pageColumn" />
          <ListOfLeaves
            getCurrentStudent={this.props.getCurrentStudent}
            className="pageColumn"
          />
        </div>
        <hr />
        <div className="buttons">
          <button onClick={this.editStudent.bind(this)} className="editButton">
            Edit
          </button>
          <button
            onClick={this.deleteStudent.bind(this)}
            className="deleteButton"
          >
            Delete
          </button>
        </div>
      </div>
    )
  }
}

export default StudentPage
