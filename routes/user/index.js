var debug = require('debug')('auth:routes:user:index')
var users = require(process.cwd() + '/dbm').get('users')
var router = require('express').Router()
var jwt = require('express-jwt')
var ObjectId = require('mongodb').ObjectId

const secret = process.env.SECRET_TOKEN

router.use('/user/*',
  jwt({secret})
)

router.get('/user/profile', (req, res, next) => {
  debug('profile')
  var _id = ObjectId(req.user.uid)
  users.find(
    {
      _id
    }
  )
  .project({
    _id: 0,
    profile: 1
  })
  .next((err, doc) => {
    if (err) {
      next(err, req, res, next)
    } else {
      // @TODO error on 404 or simular
      // in case no profile
      res.json(doc.profile)
    }
  })
})

module.exports = router
