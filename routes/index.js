var router = require('express').Router()

router.use(require('./user'))
router.use(require('./private'))
router.use(require('./redirects'))

module.exports = router
