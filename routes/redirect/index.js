var router = require('express').Router()
var origin = process.env.ORIGIN_URL
var debug = require('debug')('auth:handlers:index')

router.get('/redirect/ok/:token', (req, res) => {
  var token = req.params.token
  debug(`success ${token}`)
  res.redirect(`${origin}?token=${token}`)
})

router.get('/redirect/no', (req, res) => {
  debug('failture')
  res.redirect(`${origin}?token=null`)
})

module.exports = router
