import React, { Component } from "react"
import LeaveItem from "./LeaveItem"
import { getAccessToken } from "../../AuthService"

class ListOfLeaves extends Component {
  constructor() {
    super()
    this.state = {
      leaves: []
    }
  }

  getLeaves() {
    const url = "http://localhost:8080"
    fetch(url + `/leaves/${this.props.getCurrentStudent().slack}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })
      .then(results => results.json())
      .then(data => {
        this.setState({ leaves: data.data })
      })
      .catch(function(error) {
        console.log("fail", error)
      })
  }

  componentDidMount() {
    this.getLeaves()
  }

  render() {
    return (
      <div className="pageColumn">
        <ul>
          <h2>Leaves</h2>
          {this.state.leaves.map(cur => (
            <LeaveItem key={cur.lid} date={cur.date} />
          ))}
        </ul>
      </div>
    )
  }
}

export default ListOfLeaves
