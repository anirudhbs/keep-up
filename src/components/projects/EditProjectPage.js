import React, { Component } from "react"
import { getAccessToken } from "../../AuthService"

class EditProjectPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projectDetails: {
        pid: null,
        uid: null,
        projectname: "",
        repo: ""
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    this.fetchProjectDetails()
  }

  fetchProjectDetails() {
    const url = "http://localhost:8080"
    const pid = this.props.history.location.pathname.split("/")[4]
    fetch(url + "/project/" + pid, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })
      .then(results => results.json())
      .then(data => {
        this.setState({ projectDetails: data.data })
      })
      .catch(function(error) {
        console.log("fail", error)
      })
  }

  handleChange(event) {
    const state = this.state.projectDetails
    state.projectname = event.target.value
    this.setState({ projectDetails: state })
  }

  handleChange2(event) {
    const state = this.state.projectDetails
    state.repo = event.target.value
    this.setState({ projectDetails: state })
  }

  handleSubmit(event) {
    this.editProject()
  }

  editProject() {
    const url = "http://localhost:8080"
    const pid = this.props.history.location.pathname.split("/")[4]
    fetch(url + "/project/" + pid, {
      method: "post",
      headers: {
        "Content-Type": "application/Json",
        Authorization: `Bearer ${getAccessToken()}`
      },
      body: JSON.stringify(this.state.projectDetails)
    })
      .then(results => {
        return results.json()
      })
      .then(data => {
        const uid = this.props.history.location.pathname.split("/")[2]
        this.props.history.push(`/students/${uid}`)
      })
      .catch(function(error) {
        console.log("fail", error)
      })
  }

  onCancel() {
    const sid = this.props.history.location.pathname.split("/")[2]
    const pid = this.props.history.location.pathname.split("/")[4]
    this.props.history.push(`/students/${sid}/projects/${pid}`)
  }

  render() {
    console.log(this.props)
    return (
      <div className="AddProjectPage">
        <h2>Edit Project</h2>
        <div>Name</div>
        <input
          type="text"
          value={this.state.projectDetails.projectname}
          onChange={this.handleChange.bind(this)}
        />
        <div>Repository</div>
        <input
          type="text"
          value={this.state.projectDetails.repo}
          onChange={this.handleChange2.bind(this)}
        />
        <div>
          <button onClick={this.handleSubmit}>Submit</button>
          <button onClick={this.onCancel.bind(this)} className="cancelButton">
            Cancel
          </button>
        </div>
      </div>
    )
  }
}

export default EditProjectPage
