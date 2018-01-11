import React, { Component } from 'react'
import StudentItem from './StudentItem'

class ListOfStudents extends Component {
  render () {
    return (
      <div className='ListOfProjects'>
        <ul>
          <h2>Students</h2>
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
