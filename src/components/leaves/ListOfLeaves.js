import React, { Component } from 'react'
import LeaveItem from './LeaveItem'
import { getAccessToken } from '../../AuthService'

class ListOfLeaves extends Component {
  constructor () {
    super()
    this.state = {
      leaves: []
    }
  }

  componentDidMount () {
    const url = 'http://localhost:8080'
    fetch(url + `/attendance/${this.props.id}`, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })
    .then((results) => {
      return results.json()
    })
    .then((data) => {
      this.setState({ leaves: data.data })
    })
    .catch(function (error) {
      console.log('fail', error)
    })
  }

  render () {
    return (
      <div className='pageColumn'>
        <ul>
          <h2>Leaves</h2>
          {
            this.state.leaves.map(cur =>
              <LeaveItem key={cur.date} date={cur.date} reason={cur.reason} />
            )
          }
        </ul>
      </div>
    )
  }
}

export default ListOfLeaves
