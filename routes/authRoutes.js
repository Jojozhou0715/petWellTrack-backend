const router = require('express').Router();
const { AuthCtrl } = require('../controllers') ;
// const { decodeUserFromToken, checkAuth } = require('../middleware/auth.js');

router.post('/signup', AuthCtrl.signup)
router.post('/login', AuthCtrl.login)

module.exports = router


