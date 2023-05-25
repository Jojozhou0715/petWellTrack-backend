const db = require('../models')
const { User, Profile } = require('../models')
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            throw new Error('Account already exists')
        } else if (!process.env.JWT_SECRET) {
            throw new Error('no SECRET in .env file')
        } else {
            const newProfile = await Profile.create(req.body)
            req.body.profile = newProfile._id
            const createdUser = await User.create(req.body)
            const token = createJWT(createdUser)
            res.status(200).json({ token })
        }
    } catch (err) {
        if (req.body.profile) {
            await Profile.findByIdAndDelete(req.body.profile)
        }
        res.status(500).json({ err: err.message })
    }
}

const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(401).json({ err: 'User not found' })
        }
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch) {
                const token = createJWT(user)
                res.json({ token })
            } else {
                res.status(401).json({ err: 'Incorrect password' })
            }
        })
    } catch (err) {
        res.status(500).json(err)
    }
}

const createJWT = (user) => {
    return jwt.sign({ user}, process.env.JWT_SECRET, { expiresIn: '24h'})
}

module.exports = { signup, login}