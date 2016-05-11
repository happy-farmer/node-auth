var router = require('express').Router()
var origin = 'http://localhost:3000/'

router.get('/ok/:token', (req, res) => {
  var token = req.params.token
  res.redirect(`${origin}?token=${token}`)
})

router.get('/no', (req, res) => {
  res.redirect(`${origin}?token=null`)
})

module.exports = router
