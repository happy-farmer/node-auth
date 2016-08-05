var passport = require('passport')
var router = require('express').Router()
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
var debug = require('debug')('auth:providers:google')

debug('loading')
var googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  require('../profile/upsert')
)
passport.use(googleStrategy)

var auth = passport.authenticate.bind(passport)
router.get('/google/connect', auth('google',
  { scope: [
    'https://www.googleapis.com/auth/plus.login'
  ]
}))
router.get('/google/callback',
  auth('google', {
    failureRedirect: '/redirect/no',
    session: false
  }),
  require('../profile/complete')
)

debug('loaded')
module.exports = router
