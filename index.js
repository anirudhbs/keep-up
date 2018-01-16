const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const PORT = 8080
const router = require('./routes')
const db = require('./db')

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.json())
app.use('/', router)

app.get('/students', db.getAllStudents)

app.put('/student/add', db.addStudent)
app.delete('/student/:id', db.deleteStudent)
app.post('/student/:id', db.editStudent)
app.get('/studentname/:sid', db.getStudentName)

app.get('/projects/:sid', db.getStudentProjects)
app.get('/demos/:sid', db.getStudentDemos)
app.get('/attendance/:sid', db.getStudentAttendance)

app.put('/project/add', db.addProject)
app.get('/project/:projectid', db.getProjectDetails)
app.delete('/project/:pid', db.deleteProject)
app.post('/project/:pid', db.editProject)

app.put('/demo/add', db.addDemo)
app.get('/demo/:did', db.getDemoDetails)
app.delete('/demo/:did', db.deleteDemo)

app.get('/demolist/:sid', db.getStudentProjectsForDemo)
// app.get('/project/:pid', db.getProjectDetails2)

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
