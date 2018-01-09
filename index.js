const express = require('express')
const { Client } = require('pg')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const PORT = 8080

app.use(express.static('public'))
app.use(bodyParser.json())

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/user/create', (req, res) => {
  const queryString = 'INSERT INTO users VALUES($1, $2) RETURNING id'
  const values = [req.body.id, req.body.name]
  client.query(queryString, values, (err, response) => {
    if (err) throw err
    else {
      res.send(response.rows[0])
    }
  })
})

app.delete('/user/delete', (req, res) => {
  const queryString = 'DELETE FROM users WHERE id= $1 RETURNING id'
  const values = [req.body.id]
  client.query(queryString, values, (err, response) => {
    if (err) throw err
    else {
      res.send(response.rows[0])
    }
  })
})

app.post('/users', (req, res) => {
  const queryString = 'SELECT * FROM users'
  client.query(queryString, (err, response) => {
    if (err) throw err
    else {
      res.send(response.rows)
    }
  })
})

app.post('/user/:userid', (req, res) => {
  const queryString = 'SELECT * FROM users WHERE id=$1'
  const values = [req.params.userid]
  client.query(queryString, values, (err, response) => {
    if (err) throw err
    else {
      res.send(response.rows[0])
    }
  })
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
  client.connect()
})
