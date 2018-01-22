const fetch = require('node-fetch')
const { token } = require('./config')

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
  fetch(`https://slack.com/api/channels.info?token=${token}&channel=C048L0JR2`)
  .then((res) => res.text())
  .then((body) => {
    const members = JSON.parse(body).channel.members
    cb(members)
  })
}

function addStudentsToDB (arr) {
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
  const oldest = getOldestDate()
  fetch(`https://slack.com/api/channels.history?token=${token}&channel=C048L0JR2&oldest=${oldest}`)
  .then((res) => res.text())
  .then((body) => {
    const messages = JSON.parse(body).messages
    const activeUsers = messages.map((cur) => ({ user: cur.user, date: cur.ts }))
    cb(activeUsers)
  })
}

function getOldestDate () {
  const t = new Date
  const str = t.toISOString().slice(0, 10)
  return new Date(str) / 1000
}

checkWhoMessaged((data) => {
  const list = data.filter((cur) => cur.user !== undefined).map((cur) => cur.user)
  getUsers((data) => {
    data.map((cur) => {
      if (!list.includes(cur)) {
        const date = new Date().toLocaleDateString()
        const queryString = 'INSERT INTO leaves VALUES(DEFAULT, $1, $2, $3)'
        const values = [cur, date, 'placeholder']
        client.query(queryString, values, (err, res) => {
          if (err) console.log('error!')
          else console.log('success')
        })
      }
    })
  })
})
