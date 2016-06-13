var debug = require('debug')('auth:app')
var passport = require('passport')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var app = require('express')()

app.use(cookieParser())
app.use(session({
  secret: process.env.SECRET_SESSION,
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(require('./providers'))
app.use(require('./handlers'))
app.use(require('./routes'))

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).end()
  }
})

debug('loaded')
module.exports = app
