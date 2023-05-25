const router = require('express').Router()
const { PetCtrl } = require('../controllers')
const { decodeUserFromToken, checkAuth } = require('../middleware/auth.js');

router.use(decodeUserFromToken)
router.get('/', checkAuth, PetCtrl.index)
router.post('/', checkAuth, PetCtrl.create)
router.get('/:id', checkAuth, PetCtrl.show)
router.put('/:id', checkAuth, PetCtrl.update)
router.delete('/:id', checkAuth, PetCtrl.deletePet)

module.exports = router
