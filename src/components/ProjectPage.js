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
    console.log(this.state.projectInfo.pid, '-----')
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
      this.setState({ projectInfo: data.data })
    })
    .catch(function (error) {
      console.log('fail', error)
    })
  }

  deleteProject () {
    const url = 'http://localhost:8080'
    fetch(url + '/project/' + this.props.match.params.pid, {
      method: 'delete'
    })
    .then((results) => {
      return results.json()
    })
    .then((data) => {
      console.log('don haci')
      this.props.history.push('/student/' + this.state.projectInfo.uid)
    })
    .catch(function (error) {
      console.log('fail', error)
    })
  }

  render () {
    return (
      <div>
        <h2>Project Page</h2>
        <div>{this.state.projectInfo.name}</div>
        <div>{this.state.projectInfo.studentName}</div>
        <div>{this.state.projectInfo.repo}</div>
        <hr />
        <button onClick={this.deleteProject.bind(this)} className='deleteButton'>Delete</button>

      </div>
    )
  }
}

export default ProjectPage
