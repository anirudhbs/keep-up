import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { login, logout, isLoggedIn } from '../AuthService'

class Header extends Component {
  render () {
    if (!isLoggedIn()) {
      return (
        <header>
          <nav>
            <ul className='login-list'>
              <li><Link to='/students' className='Link homeButton'>Home</Link></li>
              <li><button className='login' onClick={() => login()}>Log In</button></li>
            </ul>
          </nav>
        </header>
      )
    }

    return (
      <header>
        <nav>
          <ul className='login-list'>
            <li><Link to='/students' className='Link homeButton'>Home</Link></li>
            <li><Link to='/profile' className='Link homeButton'>Profile</Link></li>
            <li><Link to='/'><button className='login' onClick={() => logout()}>Log out</button></Link></li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default Header
