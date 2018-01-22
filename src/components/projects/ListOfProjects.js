import React, { Component } from 'react'
import ProjectItem from './ProjectItem'
import { Link } from 'react-router-dom'
import { getAccessToken } from '../../AuthService'

class ListOfProjects extends Component {
  constructor () {
    super()
    this.state = {
      projects: []
    }
  }

  getProjects () {
    const url = 'http://localhost:8080'
    fetch(url + `/projects/${this.props.id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })
    .then((results) => results.json())
    .then((data) => {
      this.setState({ projects: data.data })
    })
    .catch(function (error) {
      console.log('fail', error)
    })
  }

  componentDidMount () {
    this.getProjects()
  }

  render () {
    return (
      <div className='pageColumn'>
        <ul>
          <h2>Projects</h2>
          <Link to='/projects/add' className='Link AddStudentButton'>Add Project</Link>
          {
            this.state.projects.map(cur =>
              <ProjectItem key={cur.pid} id={cur.pid} name={cur.projectname} />
            )
          }
        </ul>
      </div>
    )
  }
}

export default ListOfProjects