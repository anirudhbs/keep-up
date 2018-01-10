import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
  clickMe () {
    console.log(this)
    this.state.history.push('/invidualUser')
  }

  render () {
    return (
      <header>
        <nav>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/individualUser'>User</Link></li>
            {/* <li><Link to='/placeholder'>PlaceHolder</Link></li> */}
            <li onClick={this.clickMe.bind(this)}>temp</li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default Header
