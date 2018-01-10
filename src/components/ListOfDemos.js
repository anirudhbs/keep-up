import React, { Component } from 'react'
import DemoItem from './DemoItem'

class ListOfDemos extends Component {
  constructor () {
    super()
    this.state = {
      demos: []
    }
  }

  componentDidMount () {
    const url = 'http://localhost:8080'
    fetch(url + `/${this.props.id}/demos`, {
      method: 'post'
    })
    .then((results) => {
      return results.json()
    })
    .then((data) => {
      this.setState({ demos: data })
      console.log(data)
    })
    .catch(function (error) {
      console.log('fail', error)
    })
  }

  render () {
    return (
      <div className='ListOfProjects'>
        <ul>
          <h2>Demos</h2>
          {
            this.state.demos.map(cur =>
              <DemoItem key={cur.project_id} id={cur.project_id} repo={cur.repository} />
            )
          }
        </ul>
      </div>
    )
  }
}

export default ListOfDemos
