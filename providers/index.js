var router = require('express').Router()

router.use(require('./facebook'))
router.use(require('./twitter'))

module.exports = router
