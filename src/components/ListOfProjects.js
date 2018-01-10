import React, { Component } from 'react'
import ProjectItem from './ProjectItem'

class ListOfProjects extends Component {
  constructor () {
    super()
    this.state = {
      projects: []
    }
  }

  componentDidMount () {
    const url = 'http://localhost:8080'
    fetch(url + `/${this.props.studentid}/students`, {
      method: 'post'
    })
    .then((results) => {
      return results.json()
    })
    .then((data) => {
      this.setState({ students: data })
    })
    .catch(function (error) {
      console.log('fail', error)
    })
  }

  render () {
    return (
      <div className='ListOfProjects'>
        <ul>
          <h2>Projects</h2>
          {
            this.state.projects.map(cur =>
              <ProjectItem key={cur.project_id} id={cur.project_id} user={cur.user_id} repo={cur.repository} />
            )
          }
        </ul>
      </div>
    )
  }
}

export default ListOfProjects
