const mongoose = require('mongoose');
const Profile = require('./Profile');

const Schema = mongoose.Schema;

const PetSchema = new Schema({
    petName: { type: String, required: true },
    image: { type: String},
    species: { type: String,
               required: true,
               enum: ["Dog", "Cat", "Horse", "Bird", "Rabbit", "Hamster", "Other"]},
    breed: { type: String},
    sex: { type: String, enum: ["Male", "Female"]},
    age: { type: String },
    weight: { type: String},
    microchipNo: { type: String},
    vaccination: { type: String},
    medicalRecord: [{ type: String}],
    owner: { type: Schema.Types.ObjectId, ref: 'Profile' }
});

const Pet = mongoose.model('Pet', PetSchema);

module.exports = Pet;
