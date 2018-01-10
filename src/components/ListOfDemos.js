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
      console.log('demo', data)
    })
    .catch(function (error) {
      console.log('fail', error)
    })
  }

  render () {
    return (
      <div className='ListOfStudents'>
        <ul>
          <h2>Demos</h2>
          {
            this.state.demos.map(cur =>
              <DemoItem key={cur.did} did={cur.did} uid={cur.uid} pid={cur.pid} rating={cur.rating} />
            )
          }
        </ul>
      </div>
    )
  }
}

export default ListOfDemos
