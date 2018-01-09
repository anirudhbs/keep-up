import React, { Component } from 'react'
import '../css/App.css'
import ListOfStudents from './ListOfStudents'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <ListOfStudents />
      </div>
    )
  }
}

export default App
