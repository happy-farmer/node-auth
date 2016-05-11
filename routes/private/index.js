var router = require('express').Router()
var jwt = require('express-jwt')

const secret = process.env.SECRET_API

router.use('/private/*',
  jwt({secret})
)

router.get('/private/validate/:token', (req, res, next) => {
  res.send(req.user)
})

module.exports = router
