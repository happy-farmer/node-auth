var debug = require('debug')('auth:completeProfile')
var jwt = require('jsonwebtoken')
var tokens = require(process.cwd() + '/dbm').get('tokens')

const secret = process.env.SECRET_TOKEN
var options = {algorithm: 'HS256'}

module.exports = (req, res, next) => {
  debug('ok')
  var user = req.user
  jwt.sign({user}, secret, options, (_id) => {
    tokens.insertOne({
      _id,
      user
    })
    res.redirect(`/ok/${_id}`)
  })
}
