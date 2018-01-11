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
    })
    .catch(function (error) {
      console.log('fail', error)
    })
  }

  render () {
    if (this.state.demos.length === 0) {
      return (
        <div className='ListOfDemos'>
          <ul>
            <h2>Demos</h2>
            Empty
          </ul>
        </div>
      )
    }

    return (
      <div className='ListOfDemos'>
        <ul>
          <h2>Demos</h2>
          {
            this.state.demos.map(cur =>
              <DemoItem key={cur.did} did={cur.did} uid={cur.uid} pid={cur.pid} rating={cur.rating} date={cur.date} />
            )
          }
        </ul>
      </div>
    )
  }
}

export default ListOfDemos
