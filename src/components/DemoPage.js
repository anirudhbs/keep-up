import React, { Component } from 'react'

class DemoPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      demoInfo: {
        did: null,
        uid: null,
        name: null,
        pid: null,
        projectname: null,
        date: null,
        rating: null
      }
    }
  }

  componentWillMount () {
    this.fetchDemoInfo()
  }

  fetchDemoInfo () {
    const url = 'http://localhost:8080'
    fetch(url + '/demo/' + this.props.match.params.did, {
      method: 'get'
    })
    .then((results) => {
      return results.json()
    })
    .then((data) => {
      this.setState({ demoInfo: data.data })
      this.props.setCurrentDemo(this.props.match.params.did)
    })
    .catch(function (error) {
      console.log('fail', error)
    })
  }

  editProject () {
    this.props.history.push('/edit/project')
  }

  goBack () {
    this.props.history.push('/student/' + this.state.demoInfo.uid)
  }

  deleteDemo () {
    const url = 'http://localhost:8080'
    fetch(url + '/demo/' + this.state.demoInfo.did, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/Json'
      }
    })
    .then((results) => {
      return results.json()
    })
    .then((data) => {
      this.goBack()
    })
    .catch(function (error) {
      console.log('fail', error)
    })
  }

  render () {
    return (
      <div>
        <h2>Demo Page</h2>
        <div>Project name: {this.state.demoInfo.projectname}</div>
        <div>Student Name: {this.state.demoInfo.name}</div>
        <div>Date: {String(this.state.demoInfo.date).slice(0, 10)}</div>
        <div>Rating: {this.state.demoInfo.rating}</div>
        <hr />
        <div>
          <button onClick={this.goBack.bind(this)} className='backButton'>Back</button>
          <button onClick={this.deleteDemo.bind(this)} className='deleteButton'>Delete</button>
        </div>
      </div>
    )
  }
}

export default DemoPage
