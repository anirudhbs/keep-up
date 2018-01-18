const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const PORT = 8080
const router = require('./routes')
const db = require('./db')
const jwt = require('express-jwt')
const jwks = require('jwks-rsa')
const jwtAuthz = require('express-jwt-authz')

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
  audience: 'http://learning-auth0.com', // or 'http://keep-up-react.com'
  issuer: 'https://keep-up.auth0.com/',
  algorithms: ['RS256']
})
const checkScopes = jwtAuthz([ 'openid' ])

app.get('/students', authCheck, checkScopes, db.getAllStudents)

app.put('/student/add', authCheck, checkScopes, db.addStudent)
app.delete('/student/:id', authCheck, checkScopes, db.deleteStudent)
app.post('/student/:id', authCheck, checkScopes, db.editStudent)
app.get('/studentname/:sid', authCheck, checkScopes, db.getStudentName)

app.get('/projects/:sid', authCheck, checkScopes, db.getStudentProjects)
app.get('/demos/:sid', authCheck, checkScopes, db.getStudentDemos)
app.get('/attendance/:sid', authCheck, checkScopes, db.getStudentAttendance)

app.put('/project/add', authCheck, checkScopes, db.addProject)
app.get('/project/:projectid', authCheck, checkScopes, db.getProjectDetails)
app.delete('/project/:pid', authCheck, checkScopes, db.deleteProject)
app.post('/project/:pid', authCheck, checkScopes, db.editProject)

app.put('/demo/add', authCheck, checkScopes, db.addDemo)
app.get('/demo/:did', authCheck, checkScopes, db.getDemoDetails)
app.delete('/demo/:did', authCheck, checkScopes, db.deleteDemo)

app.get('/demolist/:sid', authCheck, checkScopes, db.getStudentProjectsForDemo)

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
