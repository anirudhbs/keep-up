const express = require("express")
const app = express()
const cors = require("cors")
const jwt = require("express-jwt")
const jwks = require("jwks-rsa")
const bodyParser = require("body-parser")

const router = require("./routes")
const PORT = 8080

const authCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://keep-up.auth0.com/.well-known/jwks.json"
  }),
  audience: "http://learning-auth0.com",
  issuer: "https://keep-up.auth0.com/",
  algorithms: ["RS256"]
})

app.use(cors())
app.use(express.static("public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// app.all("/*", authCheck, (req, res, next) => {
//   // req.user.sub = auth0|5a5f2e183eca610bd65c1f42
//   console.log("---------\n", req.user)
//   next()
// })

app.put("/student/add", (req, res, next) => {
  next()
  // const { sub } = req.user
  // if (sub === "auth0|5a5f2e183eca610bd65c1f42") next()
  // else res.status(403).json({ status: "error", data: null })
})

app.use("/", router)

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
