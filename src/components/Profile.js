import React, { Component } from 'react'
import { userProfile, getProfile } from '../AuthService'

class Profile extends Component {
  componentWillMount () {
    this.setState({ profile: {} })
    if (!userProfile) {
      getProfile((err, profile) => {
        if (err) throw err
        this.setState({ profile })
      })
    } else {
      this.setState({ profile: userProfile })
    }
  }
  render () {
    const { profile } = this.state
    return (
      <div className='container'>
        <div className='profile-area'>
          <h1>{profile.name}</h1>
          <div>
            <h3>{profile.nickname}</h3>
          </div>
          <pre>{JSON.stringify(profile, null, 2)}</pre>
        </div>
      </div>
    )
  }
}

export default Profile
