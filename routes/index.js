var router = require('express').Router()

router.use(require('./user'))
router.use(require('./private'))

module.exports = router
