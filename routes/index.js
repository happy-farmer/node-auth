var router = require('express').Router()

router.use(require('./user'))
router.use(require('./private'))
router.use(require('./redirect'))

module.exports = router
