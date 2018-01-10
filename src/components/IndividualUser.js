import React, { Component } from 'react'

class IndividualUser extends Component {
  constructor (props) {
    super(props)
    this.state = {
      placeholder: ''
    }
  }

  componentDidMount () {
    console.log('mounted individual user')
  }

  showDetails () {
    console.log('clicked!')
  }

  render () {
    return (
      <div>
        individual user
      </div>
    )
  }
}

export default IndividualUser
