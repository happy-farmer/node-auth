var debug = require('debug')('auth:completeProfile')
var jwt = require('jsonwebtoken')
var tokens = require(process.cwd() + '/dbm').get('tokens')

const secret = process.env.SECRET_TOKEN
var options = {algorithm: 'HS256'}

module.exports = (req, res, next) => {
  debug('ok')
  var user = req.user
  jwt.sign({user}, secret, options, (token) => {
    tokens.insertOne({
      _id: token,
      user
    })
    res.redirect(`/ok/${token}`)
  })
}