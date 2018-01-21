import React, { Component } from 'react'
// import { userProfile, getProfile } from '../AuthService'
import { Link } from 'react-router-dom'

class AdminPage extends Component {
  constructor () {
    super()
    this.state = {
    }
  }

  componentWillMount () {
  }

  render () {
    return (
      <div>
        <Link to='/students/add' className='Link AddStudentButton'>Add Student</Link>
      </div>
    )
  }
}

export default AdminPage
