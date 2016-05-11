var debug = require('debug')('auth:routes:user:index')
var users = require(process.cwd() + '/dbm').get('users')
var router = require('express').Router()
var jwt = require('express-jwt')

const secret = process.env.SECRET_TOKEN

router.use('/user/*',
  jwt({secret})
)

router.get('/user/profile', (req, res, next) => {
  debug('profile')

  users.find(
    {
      _id: req.user._id
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
      res.json(doc.profile)
    }
  })
})

module.exports = router
