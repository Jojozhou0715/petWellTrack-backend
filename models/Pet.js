const mongoose = require('mongoose');
const Profile = require('./Profile');

const Schema = mongoose.Schema;

const PetSchema = new Schema({
    petName: { type: String, required: true },
    image: { type: String, required: true },
    species: { type: String,
               required: true,
               enum: ["Dog", "Cat", "Horse", "Bird", "Rabbit", "Other"]},
    breed: { type: String, required: true },
    age: { type: String, required: true },
    weight: { type: String, required: true },
    microchipNo: { type: String, required: true },
    vaccination: { type: String, required: true },
    medicalRecord: [{ type: String, required: true }],
    owner: { type: Schema.Types.ObjectId, ref: 'Profile' }
});

const Pet = mongoose.model('Pet', PetSchema);

module.exports = Pet;
