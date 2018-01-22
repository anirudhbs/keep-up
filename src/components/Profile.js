import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { isAdmin } from '../AuthService'

class Profile extends Component {
  constructor () {
    super()
    this.state = {
      profile: ''
    }
  }

  componentWillMount () {
    this.setState({ profile: localStorage.getItem('auth0_token') })
  }

  render () {
    return (
      <div>
        {
          isAdmin() && (
          <div className='profile'>
            <Link to='/students/add' className='Link AddStudentButton'>Add Student</Link>
          </div>)
        }
      </div>
    )
  }
}

export default Profile
