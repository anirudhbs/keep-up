const express = require('express')
const {
  Client
} = require('pg')
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
  const queryString = 'SELECT uid, name FROM students WHERE status=TRUE ORDER BY uid'
  client.query(queryString, (err, response) => {
    if (err) {
      res.send({ status: 'fail', data: [] })
      // throw err
    } else {
      res.send({
        status: 'success',
        data: response.rows
      })
    }
  })
})

app.post('/:studentid/projects', (req, res) => {
  const id = req.params.studentid
  const queryString = 'SELECT pid, uid, projectName, repo FROM projects WHERE uid = $1 ORDER BY pid'
  const values = [id]
  client.query(queryString, values, (err, response) => {
    if (err) {
      res.send({ status: 'fail', data: [] })
      // throw err
    } else {
      res.send({
        status: 'success',
        data: response.rows
      })
    }
  })
})

app.post('/:studentid/demos', (req, res) => {
  const id = req.params.studentid
  const queryString = 'SELECT did, uid, pid, rating, date FROM demos WHERE uid = $1 ORDER BY did'
  const values = [id]
  client.query(queryString, values, (err, response) => {
    if (err) {
      res.send({ status: 'fail', data: [] })
      // throw err
    } else {
      res.send({
        status: 'success',
        data: response.rows
      })
    }
  })
})

app.post('/:studentid/attendance', (req, res) => {
  const id = req.params.studentid
  const queryString = 'SELECT uid, date, reason FROM attendance WHERE uid = $1'
  const values = [id]
  client.query(queryString, values, (err, response) => {
    if (err) {
      res.send({ status: 'fail', data: [] })
      // throw err
    } else {
      res.send({
        status: 'success',
        data: response.rows
      })
    }
  })
})

app.post('/project/:projectid', (req, res) => {
  const id = req.params.projectid
  const queryString = 'SELECT p.pid, p.uid, s.name AS "studentName", p.projectName, p.repo FROM projects p, students s WHERE pid = $1 AND p.uid=s.uid'
  const values = [id]
  client.query(queryString, values, (err, response) => {
    if (err) {
      res.send({ status: 'fail', data: {} })
      // throw err
    } else {
      res.send({
        status: 'success',
        data: response.rows[0]
      })
    }
  })
})

app.post('/student/add', (req, res) => {
  const queryString = 'INSERT INTO students VALUES(DEFAULT, $1, $2)'
  const values = [req.body.studentName, true]
  client.query(queryString, values, (err, response) => {
    if (err) {
      res.send({ status: 'fail' })
      // throw err
    } else {
      res.send({
        status: 'success'
      })
    }
  })
})

app.delete('/student/:id', (req, res) => {
  const queryString = 'DELETE FROM students WHERE uid=$1'
  const values = [req.params.id]
  client.query(queryString, values, (err, response) => {
    if (err) {
      res.send({ status: 'fail' })
      // throw err
    } else {
      res.send({
        status: 'success'
      })
    }
  })
})

app.post('/edit/student/:id', (req, res) => {
  const queryString = 'UPDATE students SET name = $2 WHERE uid=$1'
  const values = [req.params.id, req.body.name]
  client.query(queryString, values, (err, response) => {
    if (err) {
      res.send({ status: 'fail' })
      // throw err
    } else {
      res.send({
        status: 'success',
        data: {
          name: req.body.name
        }
      })
    }
  })
})

app.put('/project/add', (req, res) => {
  const queryString = 'INSERT INTO projects VALUES(DEFAULT, $1, $2, $3)'
  const values = [req.body.uid, req.body.name, req.body.repo]
  client.query(queryString, values, (err, response) => {
    if (err) {
      res.send({ status: 'fail' })
    } else {
      res.send({
        status: 'success',
        data: {}
      })
    }
  })
})

app.delete('/project/:pid', (req, res) => {
  const queryString = 'DELETE FROM projects WHERE pid=$1'
  const values = [req.params.pid]
  client.query(queryString, values, (err, response) => {
    if (err) {
      res.send({ status: 'fail' })
      // throw err
    } else {
      res.send({
        status: 'success'
      })
    }
  })
})

app.put('/project/edit/:pid', (req, res) => {
  const queryString = 'UPDATE projects SET projectName = $2, repo = $3  WHERE pid=$1'
  const values = [req.params.pid, req.body.projectname, req.body.repo]
  client.query(queryString, values, (err, response) => {
    if (err) {
      res.send({ status: 'fail' })
      // throw err
    } else {
      res.send({
        status: 'success',
        data: {
          name: req.body.name
        }
      })
    }
  })
})

app.get('/project/:pid', (req, res) => {
  const queryString = 'SELECT * FROM projects WHERE pid = $1'
  const values = [req.params.pid]
  client.query(queryString, values, (err, response) => {
    if (err) {
      res.send({ status: 'fail' })
    } else {
      res.send({
        status: 'success',
        data: response.rows[0]
      })
    }
  })
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
  client.connect()
})
