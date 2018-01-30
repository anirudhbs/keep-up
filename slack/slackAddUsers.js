const fetch = require("node-fetch")
const { token } = require("./config")

const { Client } = require("pg")
const { postgres } = require("./config")

const client = new Client({
  user: postgres.USER,
  host: postgres.HOST,
  database: postgres.DATABASE,
  password: postgres.PASSWORD,
  port: postgres.PORT
})

client.connect()
function getUsersInChannel(cb) {
  fetch(`https://slack.com/api/channels.info?token=${token}&channel=C048L0JR2`)
    .then(res => res.text())
    .then(body => {
      const members = JSON.parse(body).channel.members
      cb(members)
    })
}

function addStudents() {
  getUsersInChannel(arr => {
    arr.map(cur => {
      const queryString = "INSERT INTO students VALUES(DEFAULT, $1, $2, $3, $4)"
      const values = [cur.name, false, cur.id, cur.name]
      client.query(queryString, values, (err, response) => {
        if (err) {
          console.log("fail")
        } else {
          console.log("success")
        }
      })
    })
  })
}

addStudents()
