import React, { Component } from "react"
import { getAccessToken } from "../../AuthService"

class AddProjectPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uid: null,
      name: "",
      repo: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    const uid = this.props.history.location.pathname.split("/")[2]
    this.setState({ uid })
  }

  handleChange(event) {
    this.setState({ name: event.target.value })
  }

  handleChange2(event) {
    this.setState({ repo: event.target.value })
  }

  handleSubmit(event) {
    if (this.state.name === "" || this.state.repo === "") {
      console.log("invalid fields")
    } else {
      this.addProject()
    }
  }

  addProject() {
    const url = "http://localhost:8080"
    fetch(url + "/project/add", {
      method: "put",
      headers: {
        "Content-Type": "application/Json",
        Authorization: `Bearer ${getAccessToken()}`
      },
      body: JSON.stringify(this.state)
    })
      .then(results => results.json())
      .then(data => {
        this.onCancel()
      })
      .catch(function(error) {
        console.log("fail", error)
      })
  }

  onCancel() {
    this.props.history.push("/students/" + this.state.uid)
  }

  render() {
    return (
      <div className="AddProjectPage">
        <h2>Add Project</h2>
        <div>Name</div>
        <input
          type="text"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <div>Repository</div>
        <input
          type="text"
          value={this.state.repo}
          onChange={this.handleChange2.bind(this)}
        />
        <div>
          <button onClick={this.handleSubmit}>Add</button>
          <button onClick={this.onCancel.bind(this)} className="cancelButton">
            Cancel
          </button>
        </div>
      </div>
    )
  }
}

export default AddProjectPage
