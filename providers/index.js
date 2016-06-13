var router = require('express').Router()

router.use(require('./facebook'))
router.use(require('./twitter'))
router.use(require('./google'))

module.exports = router
