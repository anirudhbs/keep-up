import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import ListOfStudents from './ListOfStudents'
import IndividualUser from './IndividualUser'

class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      placeholder: ''
    }
  }

  render () {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={ListOfStudents} />
          <Route exact path='/individualUser' component={IndividualUser} />
          {/* <Route path='/placeholder' component={Placeholder}/> */}
          <div>temp</div>
        </Switch>
      </main>
    )
  }
}

export default Main
