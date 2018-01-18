import React, { Component } from 'react'
import { userProfile, getProfile } from '../AuthService'

class Profile extends Component {
  constructor () {
    super()
    this.state = {
      profile: {}
    }
  }

  componentWillMount () {
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
      <div>
        <pre>{JSON.stringify(profile, null, 2)}</pre>
      </div>
    )
  }
}

export default Profile
