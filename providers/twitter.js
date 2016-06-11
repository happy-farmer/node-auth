var passport = require('passport')
var router = require('express').Router()
var TwitterStrategy = require('passport-twitter').Strategy
var debug = require('debug')('auth:providers:twitter')

debug('loading')
var twitterStrategy = new TwitterStrategy(
  {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK_URL
  },
  require('./upsertProfile')
)
passport.use(twitterStrategy)

// var auth = passport.authenticate.bind(passport)
router.get('/twitter/connect', passport.authenticate('twitter'))
router.get('/twitter/callback',
  passport.authenticate('twitter', {
    failureRedirect: '/no',
    session: false
  }),
  require('./completeProfile')
)

module.exports = router
