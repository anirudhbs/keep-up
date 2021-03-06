const controller = {}
const { Client } = require("pg")
const { postgres } = require("../config")

const client = new Client({
  user: postgres.USER,
  host: postgres.HOST,
  database: postgres.DATABASE,
  password: postgres.PASSWORD,
  port: postgres.PORT
})

client.connect()

controller.getStudents = (req, res) => {
  const queryString =
    "SELECT uid, name, slackid FROM students WHERE status=TRUE ORDER BY uid"
  client.query(queryString, (err, response) => {
    if (err) {
      res.json({ status: "fail", data: [] })
    } else {
      res.json({
        status: "success",
        data: response.rows
      })
    }
  })
}

controller.getInactiveStudents = (req, res) => {
  const queryString =
    "SELECT uid, name, slackid, status FROM students WHERE status=FALSE ORDER BY uid"
  client.query(queryString, (err, response) => {
    if (err) {
      res.json({ status: "fail", data: [] })
    } else {
      res.json({
        status: "success",
        data: response.rows
      })
    }
  })
}

controller.getStudentProjects = (req, res) => {
  const id = req.params.sid
  const queryString =
    "SELECT pid, projectName FROM projects WHERE uid = $1 ORDER BY pid"
  const values = [id]
  client.query(queryString, values, (err, response) => {
    if (err) {
      res.json({ status: "fail", data: [] })
    } else {
      res.json({
        status: "success",
        data: response.rows
      })
    }
  })
}

controller.getStudentDemos = (req, res) => {
  const id = req.params.sid
  const queryString =
    "SELECT did, date FROM demos WHERE uid = $1 ORDER BY date DESC"
  const values = [id]
  client.query(queryString, values, (err, response) => {
    if (err) {
      res.json({ status: "fail", data: [] })
    } else {
      res.json({
        status: "success",
        data: response.rows
      })
    }
  })
}

controller.getProjectDetails = (req, res) => {
  const id = req.params.pid
  const queryString =
    'SELECT p.pid, p.uid, s.name AS "studentName",p.projectName, p.repo ' +
    "FROM projects p, students s WHERE pid = $1 AND p.uid=s.uid"
  const values = [id]
  client.query(queryString, values, (err, response) => {
    if (err) {
      res.json({ status: "fail", data: {} })
    } else {
      res.json({
        status: "success",
        data: response.rows[0]
      })
    }
  })
}

controller.addStudent = (req, res) => {
  const queryString =
    "INSERT INTO students(uid, name, status) VALUES(DEFAULT, $1, $2)"
  const values = [req.body.studentName, true]
  client.query(queryString, values, (err, response) => {
    if (err) {
      console.log("x", err, response)
      res.json({ status: "fail" })
    } else {
      res.json({ status: "success" })
    }
  })
}

controller.deleteStudent = (req, res) => {
  const queryString = "DELETE FROM students WHERE uid=$1"
  const values = [req.params.sid]
  client.query(queryString, values, (err, response) => {
    if (err) {
      res.json({ status: "fail" })
    } else {
      res.json({ status: "success" })
    }
  })
}

controller.editStudent = (req, res) => {
  const queryString = "UPDATE students SET name = $2, status = $3 WHERE uid=$1"
  const values = [req.params.sid, req.body.name, req.body.status]
  client.query(queryString, values, (err, response) => {
    if (err) {
      res.json({ status: "fail" })
    } else {
      res.json({
        status: "success",
        data: {
          name: req.body.name
        }
      })
    }
  })
}

controller.addProject = (req, res) => {
  const queryString =
    "INSERT INTO projects(pid, uid, projectName, repo) VALUES(DEFAULT, $1, $2, $3)"
  const values = [req.body.uid, req.body.name, req.body.repo]
  client.query(queryString, values, (err, response) => {
    if (err) {
      res.json({ status: "fail" })
    } else {
      res.json({
        status: "success",
        data: {}
      })
    }
  })
}

controller.deleteProject = (req, res) => {
  const queryString = "DELETE FROM projects WHERE pid=$1"
  const values = [req.params.pid]
  client.query(queryString, values, (err, response) => {
    if (err) {
      res.json({ status: "fail" })
    } else {
      res.json({
        status: "success"
      })
    }
  })
}

controller.editProject = (req, res) => {
  const queryString =
    "UPDATE projects SET projectName = $2, repo = $3  WHERE pid=$1"
  const values = [req.params.pid, req.body.projectname, req.body.repo]
  client.query(queryString, values, (err, response) => {
    if (err) {
      res.json({ status: "fail" })
    } else {
      res.json({
        status: "success",
        data: {
          name: req.body.name
        }
      })
    }
  })
}

controller.deleteDemo = (req, res) => {
  const queryString = "DELETE FROM demos WHERE did = $1"
  const values = [req.params.did]
  client.query(queryString, values, (err, response) => {
    if (err) {
      res.json({ status: "fail" })
    } else {
      res.json({ status: "success", data: { id: req.params.did } })
    }
  })
}

controller.addDemo = (req, res) => {
  const queryString =
    "INSERT INTO demos(did, uid, pid, rating, date) VALUES(DEFAULT, $1, $2, $3, $4)"
  const values = [req.body.uid, req.body.pid, req.body.rating, req.body.date]
  client.query(queryString, values, (err, response) => {
    if (err) {
      res.json({ status: "fail", data: err })
    } else {
      res.json({ status: "success" })
    }
  })
}

controller.getStudentProjectsForDemo = (req, res) => {
  const queryString = "SELECT pid, projectname FROM projects WHERE uid = $1"
  const values = [req.params.sid]
  client.query(queryString, values, (err, response) => {
    if (err) {
      res.json({ status: "fail", data: [] })
    } else {
      res.json({
        status: "success",
        data: response.rows
      })
    }
  })
}

controller.getDemoDetails = (req, res) => {
  const queryString =
    "SELECT d.did, d.uid, s.name, d.pid, p.projectname, d.date, d.rating " +
    "FROM demos d, students s, projects p WHERE d.did=$1 AND d.pid = p.pid AND d.uid = s.uid"
  const values = [req.params.did]
  client.query(queryString, values, (err, response) => {
    if (err) {
      res.json({ status: "fail", data: err })
    } else {
      res.json({
        status: "success",
        data: response.rows[0]
      })
    }
  })
}

controller.getLeaves = (req, res) => {
  const queryString =
    "SELECT lid, slackid, date, reason FROM leaves WHERE slackid = $1 ORDER BY date DESC"
  const values = [req.params.sid]
  client.query(queryString, values, (err, response) => {
    if (err) {
      res.json({ status: "fail" })
    } else {
      res.json({
        status: "success",
        data: response.rows
      })
    }
  })
}

controller.getStudentDetails = (req, res) => {
  const queryString =
    "SELECT uid, name, status, slackid FROM students WHERE uid = $1"
  const values = [req.params.sid]
  client.query(queryString, values, (err, response) => {
    if (err) {
      res.json({ status: "fail" })
    } else {
      res.json({
        status: "success",
        data: response.rows[0]
      })
    }
  })
}

module.exports = controller
