var router = require('express').Router()
var origin = 'http://localhost:8080/'
var debug = require('debug')('auth:handlers:index')

router.get('/redirects/ok/:token', (req, res) => {
  var token = req.params.token
  debug(`success ${token}`)
  res.redirect(`${origin}?token=${token}`)
})

router.get('/redirects/no', (req, res) => {
  debug('failture')
  res.redirect(`${origin}?token=null`)
})

module.exports = router
