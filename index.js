const express = require('express')
const { Client } = require('pg')
const cors = require('cors')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const PORT = 8080

app.use(cors())
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

app.post('/students', (req, res) => {
  const queryString = 'SELECT * FROM students WHERE status=TRUE'
  client.query(queryString, (err, response) => {
    if (err) throw err
    else {
      res.send(response.rows)
    }
  })
})

app.post('/student', (req, res) => {
  const queryString = 'INSERT INTO students VALUES($1, $2, $3) RETURNING id'
  const values = [req.body.id, req.body.name, true]
  client.query(queryString, values, (err, response) => {
    if (err) throw err
    else {
      res.send(response.rows[0])
    }
  })
})

app.delete('/student', (req, res) => {
  const queryString = 'DELETE FROM students WHERE id= $1 RETURNING id'
  const values = [req.body.id]
  client.query(queryString, values, (err, response) => {
    if (err) throw err
    else {
      res.send(response.rows[0])
    }
  })
})

app.put('/student', (req, res) => {
  const queryString = 'UPDATE students SET name=$2 WHERE id=$1 RETURNING id'
  const values = [req.body.id, req.body.name]
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