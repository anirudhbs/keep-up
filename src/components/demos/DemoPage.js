import React, { Component } from 'react'
import { getAccessToken } from '../../AuthService'

class DemoPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      demoInfo: {}
    }
  }

  componentWillMount () {
    this.fetchDemoInfo()
  }

  fetchDemoInfo () {
    const url = 'http://localhost:8080'
    fetch(url + '/demo/' + this.props.match.params.did, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })
    .then((results) => results.json())
    .then((data) => {
      this.setState({ demoInfo: data.data })
      // this.props.setCurrentDemo(this.props.match.params.did)
    })
    .catch(function (error) {
      console.log('fail', error)
    })
  }

  goBack () {
    this.props.history.push('/student/' + this.state.demoInfo.uid)
  }

  deleteDemo () {
    const url = 'http://localhost:8080'
    fetch(url + '/demo/' + this.state.demoInfo.did, {
      method: 'delete',
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
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
      <div className='demoPage'>
        <h2>Demo Page</h2>
        <div>Project name: {this.state.demoInfo.projectname}</div>
        <div>Student Name: {this.state.demoInfo.name}</div>
        <div>Date: {new Date(this.state.demoInfo.date).toDateString()}</div>
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
