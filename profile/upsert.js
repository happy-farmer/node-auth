var debug = require('debug')('auth:profile:upsert')
var users = require(process.cwd() + '/dbm').get('users')

module.exports = (accessToken, refreshToken, providerData, done) => {
  var provider = providerData.provider
  var query = {}
  query[`providers.${provider}.id`] = providerData.id

  var providers = {}
  providers[provider] = providerData
  var data = {
    $set: {
      providers
    }
  }

  users.updateOne(
    query,
    data,
    {
      upsert: true
    }
  )
  .then((doc) => {
    var upsertedId = doc.upsertedId
    debug(`upserted ${providerData.displayName}`)
    if (upsertedId) {
      require('./new')(upsertedId, providerData, done)
    } else {
      require('./old')(query, done)
    }
  })
  .catch((err) => done(err, null))
}
