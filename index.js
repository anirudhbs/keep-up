const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('express-jwt')
const jwks = require('jwks-rsa')
const bodyParser = require('body-parser')
const router = require('./routes')
const db = require('./db')
const PORT = 8080

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', router)

const authCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://keep-up.auth0.com/.well-known/jwks.json'
  }),
  audience: 'http://learning-auth0.com',
  issuer: 'https://keep-up.auth0.com/',
  algorithms: ['RS256']
})

// app.all('/*', authCheck, (req, res, next) => {
//   // console.log(req.user.sub) // auth0|5a5f2e183eca610bd65c1f42
//   next()
// })

app.put('/student/add', (req, res, next) => {
  const { sub } = req.user || null
  if (sub === 'auth0|5a5f2e183eca610bd65c1f42') next()
  else res.status(403).json({ status: 'error', data: null })
})

app.get('/students', db.getAllStudents)

app.put('/student/add', db.addStudent)
app.delete('/student/:sid', db.deleteStudent)
app.post('/student/:sid', db.editStudent)
app.get('/student/:sid', db.getStudentDetails)

app.get('/projects/:sid', db.getStudentProjects)
app.get('/demos/:sid', db.getStudentDemos)
app.get('/leaves/:sid', db.getLeaves)

app.put('/project/add', db.addProject)
app.get('/project/:pid', db.getProjectDetails)
app.delete('/project/:pid', db.deleteProject)
app.post('/project/:pid', db.editProject)

app.put('/demo/add', db.addDemo)
app.get('/demo/:did', db.getDemoDetails)
app.delete('/demo/:did', db.deleteDemo)

app.get('/demolist/:sid', db.getStudentProjectsForDemo)

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
