import React, { Component } from 'react'
import StudentItem from './StudentItem'
import { Link } from 'react-router-dom'

class ListOfStudents extends Component {
  componentWillMount () {
    this.props.fetchData()
  }

  render () {
    return (
      <div className='ListOfStudents'>
        <ul>
          <h2>Students</h2>
          <Link to='/add/student' className='Link AddStudentButton'>Add Student</Link>
          {
            this.props.students.map(cur =>
              <StudentItem key={cur.uid} id={cur.uid} name={cur.name} openStudentsPage={this.props.openStudentsPage} />
            )
          }
        </ul>
      </div>
    )
  }
}

export default ListOfStudents
