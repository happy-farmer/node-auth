var debug = require('debug')('auth:app')
var passport = require('passport')
var app = require('express')()

app.use(passport.initialize())

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
