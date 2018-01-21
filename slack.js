const fetch = require('node-fetch')
const {token} = require('./config')

const { Client } = require('pg')
const { postgres } = require('./config')

const client = new Client({
  user: postgres.USER,
  host: postgres.HOST,
  database: postgres.DATABASE,
  password: postgres.PASSWORD,
  port: postgres.PORT
})

client.connect()

function getUsers (cb) {
  fetch(`https://slack.com/api/users.list?token=${token}`)
  .then((res) => res.text())
  .then((body) => {
    const members = JSON.parse(body).members
    const userList = members.map((cur) => ({ id: cur.id, name: cur.real_name }))
    cb(userList)
  })
}

getUsers((data) => {
  console.log(data)
  addToDB(data)
})

// checkWhoMessaged((data) => {
//   console.log(data)
// })

function addToDB (arr) {
  arr.map((cur) => {
    const queryString = 'INSERT INTO students VALUES(DEFAULT, $1, $2, $3, $4)'
    const values = [cur.name, true, cur.id, cur.name]
    client.query(queryString, values, (err, response) => {
      if (err) {
        console.log('fail')
      } else {
        console.log('success')
      }
    })
  })
}

function checkWhoMessaged (cb) {
  fetch(`https://slack.com/api/channels.history?token=${token}&channel=C048L0JR2&count=30`)
  .then((res) => res.text())
  .then((body) => {
    const messages = JSON.parse(body).messages
    const activeUsers = messages.map((cur) => cur.user)
    cb(activeUsers)
  })
}

checkWhoMessaged((data) => {
  console.log(data)
})
