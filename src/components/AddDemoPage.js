import React, { Component } from 'react'

class AddDemoPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      uid: this.props.getCurrentStudent().id,
      date: this.getTodayDate(),
      rating: '',
      pid: 0,
      projectList: []
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
    console.log(this.state)
    this.addDemo()
  }

  addDemo () {
    const url = 'http://localhost:8080'
    fetch(url + '/add/demo', {
      method: 'put',
      headers: {
        'Content-Type': 'application/Json'
      },
      body: JSON.stringify(this.state)
    })
    .then((results) => {
      return results.json()
    })
    .then((data) => {
      console.log(data)
    })
    .catch(function (error) {
      console.log('fail', error)
    })
  }

  getProjectList () {
    const url = 'http://localhost:8080'
    fetch(url + '/' + this.props.getCurrentStudent().id + '/demos', {
      method: 'get'
    })
    .then((results) => {
      return results.json()
    })
    .then((data) => {
      this.setState({ projectList: data.data })
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
      <div className='AddStudentPage'>
        <h2>Add Demo</h2>
        <div>Date</div>
        <input type='date' value={this.state.date} onChange={this.handleChangeDate.bind(this)} />
        <div>Rating</div>
        <input type='text' value={this.state.rating} onChange={this.handleChange} />
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
