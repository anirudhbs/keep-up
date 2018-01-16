import React, { Component } from 'react'
import DemoItem from './DemoItem'
import { Link } from 'react-router-dom'

class ListOfDemos extends Component {
  constructor () {
    super()
    this.state = {
      demos: []
    }
  }

  componentDidMount () {
    const url = 'http://localhost:8080'
    fetch(url + `/demos/${this.props.id}`, {
      method: 'get'
    })
    .then((results) => {
      return results.json()
    })
    .then((data) => {
      this.setState({ demos: data.data })
    })
    .catch(function (error) {
      console.log('fail', error)
    })
  }

  render () {
    return (
      <div className='pageColumn'>
        <ul>
          <h2>Demos</h2>
          <Link to='/demos/add' className='Link AddStudentButton'>Add Demo</Link>
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
