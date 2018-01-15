import React, { Component } from 'react'
import ProjectItem from './ProjectItem'
import { Link } from 'react-router-dom'

class ListOfProjects extends Component {
  constructor () {
    super()
    this.state = {
      projects: []
    }
  }

  componentDidMount () {
    const url = 'http://localhost:8080'
    fetch(url + `/${this.props.id}/projects`, {
      method: 'post'
    })
    .then((results) => {
      return results.json()
    })
    .then((data) => {
      this.setState({ projects: data.data })
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
          <Link to='/add/project' className='Link AddStudentButton'>Add Project</Link>
          {
            this.state.projects.map(cur =>
              <ProjectItem key={cur.pid} id={cur.pid} name={cur.name} repo={cur.repo} />
            )
          }
        </ul>
      </div>
    )
  }
}

export default ListOfProjects
