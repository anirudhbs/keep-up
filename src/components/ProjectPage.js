import React, { Component } from 'react'

class ProjectPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      projectInfo: {
        pid: null,
        uid: null,
        studentName: null,
        name: null,
        repo: null
      }
    }
  }

  componentWillMount () {
    this.fetchProjectInfo()
  }

  fetchProjectInfo () {
    const url = 'http://localhost:8080'
    fetch(url + '/project/' + this.props.match.params.pid, {
      method: 'post'
    })
    .then((results) => {
      return results.json()
    })
    .then((data) => {
      this.setState({ projectInfo: data })
      console.log('d', data)
    })
    .catch(function (error) {
      console.log('fail', error)
    })
  }

  componentDidMount () {
  }

  showDetails () {
  }

  render () {
    return (
      <div>
        <h2>Project Page</h2>
        <div>{this.state.projectInfo.name}</div>
        <div>{this.state.projectInfo.studentName}</div>
        <div>{this.state.projectInfo.repo}</div>
      </div>
    )
  }
}

export default ProjectPage
