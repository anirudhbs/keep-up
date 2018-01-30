import { Component } from "react"
import { setIdToken, setAccessToken } from "../AuthService"

class Callback extends Component {
  componentDidMount() {
    setAccessToken()
    setIdToken()
    window.location.href = "/students"
  }

  render() {
    return null
  }
}

export default Callback
