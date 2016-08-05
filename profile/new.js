var debug = require('debug')('auth:profile:new')
var users = require(process.cwd() + '/dbm').get('users')

module.exports = (uid, providerData, done) => {
  var profile = {
    name: providerData.displayName
  }
  var meta = {
    created: new Date()
  }

  var query = {_id: uid._id}
  var data = {
    $set: {
      profile,
      meta
    }
  }

  users.updateOne(
    query,
    data
  )
  .then(() => {
    debug('ok')
    done(null, {
      _id: uid._id
    })
  })
  .catch((err) => done(err, null))
}
