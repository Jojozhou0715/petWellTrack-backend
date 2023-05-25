const mongoose = require('mongoose')
const Profile = require('./Profile')
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6

const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    profile: { type: Schema.Types.ObjectId, ref: 'Profile'},
}, {
    timestamps: true,
})

UserSchema.set('toJSON', {
    transform: function (doc, ret) {
      delete ret.password
      return ret
    }
  })
  
UserSchema.pre('save', function (next) {
    const user = this
    if (!user.isModified('password')) return next()
    bcrypt.hash(user.password, SALT_ROUNDS)
    .then(hash => {
      user.password = hash
      next()
    })
    .catch(err => {
      next(err)
    })
  })

UserSchema.methods.comparePassword = function (tryPassword, cb) {
    bcrypt.compare(tryPassword, this.password, cb)
  }

const User = mongoose.model('User', UserSchema)

module.exports = User
