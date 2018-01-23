import React, { Component } from 'react'
import { getAccessToken } from '../../AuthService'

class AddDemoPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      uid: this.props.getCurrentStudent().id,
      date: this.getTodayDate(),
      rating: '',
      pid: 0,
      projectList: [{pid: 0, name: ''}]
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount () {
    this.getProjectList()
  }

  handleChange (event) {
    this.setState({rating: event.target.value})
  }

  handleSubmit (event) {
    if (this.state.rating === '' || this.state.pid === 0) {
      console.log('invalid fields')
    } else {
      this.addDemo()
    }
  }

  addDemo () {
    const url = 'http://localhost:8080'
    const body = {
      uid: this.state.uid,
      pid: this.state.pid,
      rating: this.state.rating,
      date: this.state.date
    }
    fetch(url + '/demo/add', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAccessToken()}`
      },
      body: JSON.stringify(body)
    })
    .then((results) => results.json())
    .then((data) => {
      this.props.history.push('/student/' + this.state.uid)
    })
    .catch(function (error) {
      console.log('fail', error)
    })
  }

  getProjectList () {
    const url = 'http://localhost:8080'
    fetch(url + '/demolist/' + this.props.getCurrentStudent().id, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })
    .then((results) => results.json())
    .then((data) => {
      const list = this.state.projectList
      this.setState({ projectList: list.concat(data.data) })
    })
    .catch(function (error) {
      console.log('fail', error)
    })
  }

  onCancel () {
    this.props.history.push('/student/' + this.state.uid)
  }

  handleChangeDate (event) {
    this.setState({date: event.target.value})
  }

  getTodayDate () {
    const date = new Date()
    return date.toISOString().slice(0, 10)
  }

  handleChangeProject (event) {
    this.setState({ pid: event.target.value })
  }

  render () {
    return (
      <div>
        <h2>Add Demo</h2>
        <div>Date</div>
        <input type='date' value={this.state.date} onChange={this.handleChangeDate.bind(this)} />
        <div>Rating</div>
        <select value={this.state.rating} onChange={this.handleChange}>
          {
            [null, 1, 2, 3, 4, 5].map((cur) =>
              <option key={cur} value={cur}>{cur}</option>
          )
          }
        </select>
        <div>Project</div>
        <div>
          <select value={this.state.pid} onChange={this.handleChangeProject.bind(this)}>
            {
              this.state.projectList.map((cur) =>
                <option key={cur.pid} value={cur.pid}>{cur.projectname}</option>
              )
            }
          </select>
        </div>
        <div>
          <button onClick={this.handleSubmit}>Add</button>
          <button onClick={this.onCancel.bind(this)} className='cancelButton' >Cancel</button>
        </div>
      </div>
    )
  }
}

export default AddDemoPage
