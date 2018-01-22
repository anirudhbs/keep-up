import React, { Component } from 'react'

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
    const { profile } = this.state
    return (
      <div>
        <pre>{profile}</pre>
      </div>
    )
  }
}

export default Profile
