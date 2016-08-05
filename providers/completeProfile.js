var debug = require('debug')('auth:completeProfile')
var jwt = require('jsonwebtoken')
var tokens = require(process.cwd() + '/dbm').get('tokens')

const secret = process.env.SECRET_TOKEN
var options = {algorithm: 'HS256'}

module.exports = (req, res, next) => {
  debug('ok')
  var uid = req.user._id
  jwt.sign({uid}, secret, options, (token) => {
    tokens.insertOne({
      token
    })
    res.redirect(`/redirect/ok/${token}`)
  })
}
