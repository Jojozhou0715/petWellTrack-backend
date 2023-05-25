const router = require("express").Router()
const profileRoute = require("./profileRoutes")
const authRoute = require("./authRoutes")
const petRoute = require("./PetRoutes")

router.use('/profile', profileRoute);
router.use('/auth', authRoute);
router.use('/pets', petRoute);

module.exports = router