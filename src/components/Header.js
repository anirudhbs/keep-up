import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { login, logout } from '../AuthService'

class Header extends Component {
  render () {
    return (
      <header>
        <nav>
          <ul>
            <li><Link to='/' className='Link homeButton'>Home</Link></li>
            <li><button onClick={() => login()}>Log In</button></li>
            <li><button onClick={() => logout()}>Log out</button></li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default Header
