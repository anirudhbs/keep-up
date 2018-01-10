import React, { Component } from 'react'
import StudentItem from './StudentItem'

class ListOfStudents extends Component {
  constructor () {
    super()
    this.state = {
    }
  }

  render () {
    return (
      <div className='ListOfStudents'>
        <ul>
          <h2>Students</h2>
          {
            this.props.students.map(cur =>
              <StudentItem key={cur.id} id={cur.id} name={cur.name} openStudentsPage={this.props.openStudentsPage} />
            )
          }
        </ul>
      </div>
    )
  }
}

export default ListOfStudents
