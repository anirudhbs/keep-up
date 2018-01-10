import React, { Component } from 'react'
import '../css/App.css'
// import ListOfStudents from './ListOfStudents'
import Main from './Main'
import Header from './Header'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Header />
        <Main />
        {/* <ListOfStudents /> */}
      </div>
    )
  }
}

export default App
