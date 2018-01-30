import React, { Component } from "react"
import { getAccessToken } from "../../AuthService"

class ProjectPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projectInfo: {}
    }
  }

  componentWillMount() {
    this.fetchProjectInfo()
  }

  fetchProjectInfo() {
    const url = "http://localhost:8080"
    fetch(url + "/project/" + this.props.match.params.pid, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })
      .then(results => results.json())
      .then(data => {
        this.setState({ projectInfo: data.data })
        this.props.setCurrentProject(this.props.match.params.pid)
      })
      .catch(function(error) {
        console.log("fail", error)
      })
  }

  deleteProject() {
    const url = "http://localhost:8080"
    fetch(url + "/project/" + this.props.match.params.pid, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })
      .then(results => results.json())
      .then(data => {
        this.goBack()
      })
      .catch(function(error) {
        console.log("fail", error)
      })
  }

  editProject() {
    const { sid, pid } = this.props.match.params
    this.props.history.push(`/students/${sid}/projects/${pid}/edit`)
  }

  goBack() {
    const { sid } = this.props.match.params
    this.props.history.push(`/students/${sid}`)
  }

  render() {
    return (
      <div className="demoPage">
        <h2>Project Page</h2>
        <div>Name: {this.state.projectInfo.projectname}</div>
        <div>Student Name: {this.state.projectInfo.studentName}</div>
        <div>Repository: {this.state.projectInfo.repo}</div>
        <hr />
        <button onClick={this.editProject.bind(this)} className="editButton">
          Edit
        </button>
        <button
          onClick={this.deleteProject.bind(this)}
          className="deleteButton"
        >
          Delete
        </button>
        <div>
          <button onClick={this.goBack.bind(this)} className="backButton">
            Back
          </button>
        </div>
      </div>
    )
  }
}

export default ProjectPage
