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
    fetch(url + `/${this.props.id}/projects`, {
      method: 'post'
    })
    .then((results) => {
      return results.json()
    })
    .then((data) => {
      this.setState({ projects: data })
    })
    .catch(function (error) {
      console.log('fail', error)
    })
  }

  render () {
    if (this.state.projects.length === 0) {
      return (
        <div className='ListOfProjects'>
          <ul>
            <h2>Projects</h2>
            Empty
          </ul>
        </div>
      )
    }

    return (
      <div className='ListOfProjects'>
        <ul>
          <h2>Projects</h2>
          {
            this.state.projects.map(cur =>
              <ProjectItem key={cur.pid} id={cur.pid} name={cur.name} />
            )
          }
        </ul>
      </div>
    )
  }
}

export default ListOfProjects
