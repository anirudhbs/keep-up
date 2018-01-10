import React, { Component } from 'react'

class DemoItem extends Component {
  componentDidMount () {
    console.log(this.props)
  }

  render () {
    return (
      <li key={this.props.did} className='ListItem'>
        {this.props.did}, {this.props.rating}
      </li>
    )
  }
}

export default DemoItem
