var passport = require('passport')
var router = require('express').Router()
var FacebookStrategy = require('passport-facebook').Strategy
var debug = require('debug')('auth:providers:facebook')

debug('loading')
var facebookStrategy = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    // Important note about facebook callback url
    // http://stackoverflow.com/a/16304984/1401973
    callbackURL: process.env.FACEBOOK_CALLBACK_URL
  },
  require('../profile/upsert')
)
passport.use(facebookStrategy)

var auth = passport.authenticate.bind(passport)
router.get('/facebook/connect', auth('facebook'))
router.get('/facebook/callback',
  auth('facebook', {
    failureRedirect: '/redirect/no',
    session: false
  }),
  require('../profile/complete')
)
debug('loaded')
module.exports = router
