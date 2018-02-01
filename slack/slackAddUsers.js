const fetch = require("node-fetch")
const { Client } = require("pg")

const { postgres, token } = require("../config")

const client = new Client({
  user: postgres.USER,
  host: postgres.HOST,
  database: postgres.DATABASE,
  password: postgres.PASSWORD,
  port: postgres.PORT
})

client.connect()

async function getUsersInChannel(cb) {
  try {
    const arr = await fetch(
      `https://slack.com/api/channels.info?token=${token}&channel=C048L0JR2`
    )
    const res = await arr.json()
    const members = res.channel.members
    return members
  } catch (err) {
    console.log(err)
    return []
  }
}

async function addStudents() {
  const arr = await getUsersInChannel()
  arr.forEach(async cur => {
    const data = await fetch(
      `https://slack.com/api/users.info?token=${token}&user=${cur}`
    )
    const res = await data.json()
    const { id, name } = res.user
    const userCheckQuery = "SELECT slackid from students where slackid = $1"
    const userCheckQueryValues = [cur]
    const users = await client.query(userCheckQuery, userCheckQueryValues)
    if (users.rows.length === 0) {
      const queryString =
        "INSERT INTO students(uid, name, slackid, status) VALUES(DEFAULT, $1, $2, $3)"
      const values = [name, id, false]

      client.query(queryString, values, err2 => {
        if (err2) {
          console.log("fail", err)
        }
      })
    }
  })
}

addStudents()
