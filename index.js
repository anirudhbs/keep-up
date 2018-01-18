const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const PORT = 8080
const router = require('./routes')
const db = require('./db')
const jwt = require('express-jwt')
const jwks = require('jwks-rsa')
// const jwtAuthz = require('express-jwt-authz')
const session = require('express-session')

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', router)

app.use(session({
  secret: '2pac',
  resave: true,
  saveUninitialized: true
}))

const authCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://keep-up.auth0.com/.well-known/jwks.json'
  }),
  audience: 'http://learning-auth0.com', // or 'http://keep-up-react.com'
  issuer: 'https://keep-up.auth0.com/',
  algorithms: ['RS256']
})
// const checkScopes = jwtAuthz(['openid'])

app.all('/*', authCheck, (req, res, next) => {
  // console.log(req.user.sub) // auth0|5a5f2e183eca610bd65c1f42
  next()
})

app.get('/students', db.getAllStudents)

app.put('/student/add', db.addStudent)
app.delete('/student/:sid', db.deleteStudent)
app.post('/student/:sid', db.editStudent)
app.get('/studentname/:sid', db.getStudentName)

app.get('/projects/:sid', db.getStudentProjects)
app.get('/demos/:sid', db.getStudentDemos)
app.get('/attendance/:sid', db.getStudentAttendance)

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
