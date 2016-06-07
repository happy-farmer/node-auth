var passport = require('passport')
var router = require('express').Router()
var TwitterStrategy = require('twitter-facebook').Strategy

var twitterStrategy = new TwitterStrategy(
  {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK_URL
  },
  require('./upsertProfile')
)
passport.use(twitterStrategy)

var auth = passport.authenticate.bind(passport)
router.get('/twitter/connect', auth('twitter'))
router.get('/twitter/callback',
  auth('twitter', {
    failureRedirect: '/no',
    session: false
  }),
  require('./completeProfile')
)

module.exports = router