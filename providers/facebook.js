var passport = require('passport')
var router = require('express').Router()
var FacebookStrategy = require('passport-facebook').Strategy

var facebookStrategy = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL
  },
  require('./upsertProfile')
)
passport.use(facebookStrategy)

var auth = passport.authenticate.bind(passport)
router.get('/facebook/connect', auth('facebook'))
router.get('/facebook/callback',
  auth('facebook', {
    failureRedirect: '/no',
    session: false
  }),
  require('./completeProfile')
)

module.exports = router
