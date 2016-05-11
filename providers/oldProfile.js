var debug = require('debug')('auth:oldProfile')
var users = require(process.cwd() + '/dbm').get('users')

module.exports = (query, done) => {
  users.find(query)
  .project({_id: 1})
  .next((err, doc) => {
    debug('ok')
    done(err, {
      _id: doc._id
    })
  })
}
