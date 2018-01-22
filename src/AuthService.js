import decode from 'jwt-decode'
import auth0 from 'auth0-js'
const ID_TOKEN_KEY = 'id_token'
const ACCESS_TOKEN_KEY = 'access_token'
const SCOPES_KEY = 'scopes'
const ID_KEY = 'auth0_token'

const CLIENT_ID = 'v3pHvXDgLQF4JuL3uT47bXcOsuZDxgKE'
const CLIENT_DOMAIN = 'keep-up.auth0.com'
const REDIRECT = 'http://localhost:3000/callback'
let SCOPE = 'openid restricted'
const AUDIENCE = 'http://learning-auth0.com'

const auth = new auth0.WebAuth({
  clientID: CLIENT_ID,
  domain: CLIENT_DOMAIN
})

export let userProfile

export function login () {
  auth.authorize({
    responseType: 'token id_token',
    redirectUri: REDIRECT,
    audience: AUDIENCE,
    scope: SCOPE
  })
}

export function logout () {
  clearIdToken()
  clearAccessToken()
  clearScopeToken()
  clearAuthToken()
}

export function requireAuth (nextState, replace) {
  if (!isLoggedIn()) {
    replace({pathname: '/'})
  }
}

export function getIdToken () {
  return localStorage.getItem(ID_TOKEN_KEY)
}

export function getAccessToken () {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

function clearAuthToken () {
  localStorage.removeItem(ID_KEY)
}

function clearIdToken () {
  localStorage.removeItem(ID_TOKEN_KEY)
}

function clearAccessToken () {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}

function clearScopeToken () {
  localStorage.removeItem(SCOPES_KEY)
}

function getParameterByName (name) {
  let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash)
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '))
}

export function setAccessToken () {
  let accessToken = getParameterByName('access_token')
  localStorage.setItem(SCOPES_KEY, JSON.stringify(SCOPE))
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
}

export function setIdToken () {
  let idToken = getParameterByName('id_token')
  localStorage.setItem(ID_TOKEN_KEY, idToken)
}

export function isLoggedIn () {
  const idToken = getIdToken()
  return !!idToken && !isTokenExpired(idToken)
}

function getTokenExpirationDate (encodedToken) {
  const token = decode(encodedToken)
  if (!token.exp) { return null }

  const date = new Date(0)
  date.setUTCSeconds(token.exp)

  return date
}

function isTokenExpired (token) {
  const expirationDate = getTokenExpirationDate(token)
  return expirationDate < new Date()
}

// export function getProfile (cb) {
//   let accessToken = getAccessToken()
//   auth.client.userInfo(accessToken, (err, profile) => {
//     if (profile) {
//       userProfile = profile
//       localStorage.setItem(ID_KEY, profile.sub)
//     }
//     cb(err, profile)
//   })
// }

export function getProfile (cb) {
  let accessToken = getAccessToken()
  auth.client.userInfo(accessToken, (err, profile) => {
    if (profile) {
      localStorage.setItem(ID_KEY, profile.sub)
    }
  })
}

export function isAdmin () {
  const id = localStorage.getItem(ID_KEY)
  return id === 'auth0|5a5f2e183eca610bd65c1f42'
}

export function userHasScopes (scopes) {
  const grantedScopes = JSON.parse(localStorage.getItem(SCOPES_KEY)).split(' ')
  return scopes.every(scope => grantedScopes.includes(scope))
}