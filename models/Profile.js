const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    name: { type: String, required: true },
    pets: [{ type: Schema.Types.ObjectId, ref: 'Pet' }]
}, {
    timestamps: true
});

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;
