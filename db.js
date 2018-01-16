const db = {}
const { Client } = require('pg')
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432
})

client.connect()

db.getAllStudents = (req, res) => {
  const queryString = 'SELECT uid, name FROM students WHERE status=TRUE ORDER BY uid'
  client.query(queryString, (err, response) => {
    if (err) {
      res.send({ status: 'fail', data: [] })
    } else {
      res.send({
        status: 'success',
        data: response.rows
      })
    }
  })
}

db.getStudentProjects = (req, res) => {
  const id = req.params.sid
  const queryString = 'SELECT pid, uid, projectName, repo FROM projects WHERE uid = $1 ORDER BY pid'
  const values = [id]
  client.query(queryString, values, (err, response) => {
    if (err) {
      res.send({ status: 'fail', data: [] })
    } else {
      res.send({
        status: 'success',
        data: response.rows
      })
    }
  })
}

db.getStudentDemos = (req, res) => {
  const id = req.params.sid
  const queryString = 'SELECT did, uid, pid, rating, date FROM demos WHERE uid = $1 ORDER BY did'
  const values = [id]
  client.query(queryString, values, (err, response) => {
    if (err) {
      res.send({ status: 'fail', data: [] })
    } else {
      res.send({
        status: 'success',
        data: response.rows
      })
    }
  })
}

db.getStudentAttendance = (req, res) => {
  const id = req.params.sid
  const queryString = 'SELECT uid, date, reason FROM attendance WHERE uid = $1'
  const values = [id]
  client.query(queryString, values, (err, response) => {
    if (err) {
      res.send({ status: 'fail', data: [] })
    } else {
      res.send({
        status: 'success',
        data: response.rows
      })
    }
  })
}

db.getProjectDetails = (req, res) => {
  const id = req.params.projectid
  const queryString = 'SELECT p.pid, p.uid, s.name AS "studentName", p.projectName, p.repo FROM projects p, students s WHERE pid = $1 AND p.uid=s.uid'
  const values = [id]
  client.query(queryString, values, (err, response) => {
    if (err) {
      res.send({ status: 'fail', data: {} })
    } else {
      res.send({
        status: 'success',
        data: response.rows[0]
      })
    }
  })
}

db.addStudent = (req, res) => {
  const queryString = 'INSERT INTO students VALUES(DEFAULT, $1, $2)'
  const values = [req.body.studentName, true]
  client.query(queryString, values, (err, response) => {
    if (err) {
      res.send({ status: 'fail' })
    } else {
      res.send({
        status: 'success'
      })
    }
  })
}

db.deleteStudent = (req, res) => {
  const queryString = 'DELETE FROM students WHERE uid=$1'
  const values = [req.params.id]
  client.query(queryString, values, (err, response) => {
    if (err) {
      res.send({ status: 'fail' })
    } else {
      res.send({
        status: 'success'
      })
    }
  })
}

db.editStudent = (req, res) => {
  const queryString = 'UPDATE students SET name = $2 WHERE uid=$1'
  const values = [req.params.id, req.body.name]
  client.query(queryString, values, (err, response) => {
    if (err) {
      res.send({ status: 'fail' })
    } else {
      res.send({
        status: 'success',
        data: {
          name: req.body.name
        }
      })
    }
  })
}

db.addProject = (req, res) => {
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
}

db.deleteProject = (req, res) => {
  const queryString = 'DELETE FROM projects WHERE pid=$1'
  const values = [req.params.pid]
  client.query(queryString, values, (err, response) => {
    if (err) {
      res.send({ status: 'fail' })
    } else {
      res.send({
        status: 'success'
      })
    }
  })
}

db.editProject = (req, res) => {
  const queryString = 'UPDATE projects SET projectName = $2, repo = $3  WHERE pid=$1'
  const values = [req.params.pid, req.body.projectname, req.body.repo]
  client.query(queryString, values, (err, response) => {
    if (err) {
      res.send({ status: 'fail' })
    } else {
      res.send({
        status: 'success',
        data: {
          name: req.body.name
        }
      })
    }
  })
}

db.deleteDemo = (req, res) => {
  const queryString = 'DELETE FROM demos WHERE did = $1'
  const values = [req.params.did]
  client.query(queryString, values, (err, response) => {
    if (err) {
      res.send({ status: 'fail' })
    } else {
      res.send({ status: 'success', data: { id: req.params.did } })
    }
  })
}

db.addDemo = (req, res) => {
  const queryString = 'INSERT INTO demos VALUES(DEFAULT, $1, $2, $3, $4)'
  const values = [req.body.uid, req.body.pid, req.body.rating, req.body.date]
  client.query(queryString, values, (err, response) => {
    if (err) {
      res.send({ status: 'fail' })
    } else {
      res.send({ status: 'success' })
    }
  })
}

db.getStudentProjectsForDemo = (req, res) => {
  const queryString = 'SELECT pid, projectname FROM projects WHERE uid = $1'
  const values = [req.params.sid]
  client.query(queryString, values, (err, response) => {
    if (err) {
      res.send({ status: 'fail', data: [] })
    } else {
      res.send({
        status: 'success',
        data: response.rows
      })
    }
  })
}

// db.getProjectDetails2 = (req, res) => {
//   const queryString = 'SELECT * FROM projects WHERE pid = $1'
//   const values = [req.params.pid]
//   client.query(queryString, values, (err, response) => {
//     if (err) {
//       res.send({ status: 'fail' })
//     } else {
//       res.send({
//         status: 'success',
//         data: response.rows[0]
//       })
//     }
//   })
// }

db.getDemoDetails = (req, res) => {
  const queryString = 'SELECT d.did, d.uid, s.name, d.pid, p.projectname, d.date, d.rating from demos d, students s, projects p WHERE d.did=$1 AND d.pid = p.pid AND d.uid = s.uid'
  const values = [req.params.did]
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
}

module.exports = db
