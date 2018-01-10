import React, { Component } from 'react'
import StudentItem from './StudentItem'

class ListOfStudents extends Component {
  constructor () {
    super()
    this.state = {
      students: []
    }
  }

  componentDidMount () {
    const url = 'http://localhost:8080'
    fetch(url + '/students', {
      method: 'post'
    })
    .then((results) => {
      return results.json()
    })
    .then((data) => {
      this.setState({ students: data })
    })
    .catch(function (error) {
      console.log('fail', error)
    })
  }

  onClick (id) {
    console.log('LoS', id)
    this.props.history.push(`/individualUser`)
  }

  render () {
    return (
      <div className='ListOfStudents'>
        <ul>
          <h2>Students</h2>
          {
            this.state.students.map(cur =>
              <StudentItem key={cur.id} id={cur.id} name={cur.name} studentPage={this.onClick.bind(this)} />
            )
          }
        </ul>
      </div>
    )
  }
}

export default ListOfStudents
