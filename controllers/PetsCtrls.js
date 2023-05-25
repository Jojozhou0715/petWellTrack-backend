const { Pet, Profile } = require('../models')

const create = async (req, res) => {
    try{
        req.body.owner = req.user.profile
        const pet = await Pet.create(req.body)
        const profile = await Profile.findByIdAndUpdate(
            req.user.profile,
            { $push: {pets: pet}},
            { new: true}
        )
        pet.owner = profile
        res.status(201).json(pet)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

const index = async (req, res) => {
    try{
        const pets = await Pet.find({ owner: req.user.profile })
        .populate('owner')
        res.status(200).json(pets)
    } catch (err) {
        res.status(500).son(err)
    }
}

const show = async (req, res) => {
    try{
        const pet = await Pet.findById(req.params.id)
        .populate('owner')
        res.status(200).json(pet)
    } catch (err){
        res.status(500).json(err)
    }
}

const update = async (req, res) => {
    try{
        const pet = await Pet.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true}
        ) .populate('owner')
        res.status(200).json(pet)
    } catch (err){
        res.status(500).json(err)
    }
}

const deletePet = async (req, res) => {
    try{
        const pet = await Pet.findByIdAndDelete(req.params.id)
        const profile = await Profile.findById(req.user.profile)
        profile.pets.remove({_id: req.params.id})
        await profile.save()
        res.status(200).json(pet)
    } catch (err){
        res.status(500).json(err)
    }
}

module.exports = {
    create,
    index,
    show,
    update,
    deletePet
}