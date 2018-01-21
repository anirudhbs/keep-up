import { Component } from 'react'
import { setIdToken, setAccessToken, getProfile } from '../AuthService'

class Callback extends Component {
  componentDidMount () {
    setAccessToken()
    setIdToken()
    getProfile()
    window.location.href = '/students'
  }

  render () {
    return null
  }
}

export default Callback
