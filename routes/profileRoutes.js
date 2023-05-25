const router = require('express').Router()
const { ProfileCtrl } = require('../controllers')
const { decodeUserFromToken, checkAuth } = require('../middleware/auth')

router.use(decodeUserFromToken)
router.get('/', checkAuth, ProfileCtrl.show)

module.exports = router