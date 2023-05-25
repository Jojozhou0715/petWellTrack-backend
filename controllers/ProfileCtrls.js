const db = require('../models')
const { Profile } = require('../models')
 
const show = async (req, res) => {
    try {
        const profile = await Profile.findById(req.user.profile)
        .populate('pets')
        res.status(200).json(profile)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

module.exports = { show }