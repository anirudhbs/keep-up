import React, { Component } from 'react'
import { getAccessToken } from '../../AuthService'
import AllStudentsItem from './AllStudentsItem'

class AllStudents extends Component {
  constructor (props) {
    super(props)
    this.state = {
      students: []
    }
  }

  componentWillMount () {
    this.getAllStudents()
  }

  getAllStudents () {
    const url = 'http://localhost:8080'
    fetch(url + '/students/all', {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })
    .then((results) => results.json())
    .then((data) => {
      if (data.status === 'success') this.setState({ students: data.data })
    })
    .catch(function (error) {
      console.log('fail', error)
    })
  }

  render () {
    console.log(this.state.students)
    return (
      <div className='listOfStudents'>
        <ul>
          {
            this.state.students.map((cur) =>
              <AllStudentsItem key={cur.uid} name={cur.name} id={cur.uid} openStudentsPage={this.props.openStudentsPage} />
            )
          }
        </ul>
      </div>
    )
  }
}

export default AllStudents
