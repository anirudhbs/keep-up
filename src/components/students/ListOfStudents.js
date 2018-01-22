import React, { Component } from 'react'
import StudentItem from './StudentItem'
import { Link } from 'react-router-dom'
import { isAdmin, getProfile } from '../../AuthService'

class ListOfStudents extends Component {
  componentWillMount () {
    this.props.fetchData()
    getProfile()
  }

  render () {
    return (
      <div className='ListOfStudents'>
        <ul>
          <h2>Students</h2>
          {isAdmin() && (<Link to='/students/add' className='Link AddStudentButton'>Add Student</Link>)}
          {
            this.props.students.map(cur =>
              <StudentItem key={cur.uid} id={cur.uid} name={cur.name} />
            )
          }
        </ul>
      </div>
    )
  }
}

export default ListOfStudents