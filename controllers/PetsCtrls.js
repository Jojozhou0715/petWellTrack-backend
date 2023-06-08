const { Pet, Profile } = require('../models')
const cloudinary = require('cloudinary').v2

const create = async (req, res) => {
    try{
        req.body.medicalRecord=req.body.medicalRecord.split(',')
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
// const create = async (req, res) => {
//     try {
//       req.body.owner = req.user.profile;
  
//       // Handle medical record photos
//       const medicalRecordFiles = req.files.medicalRecord;
//       const medicalRecordPhotos = [];
  
//       for (let i = 0; i < medicalRecordFiles.length; i++) {
//         const medicalRecordPhoto = await uploadToCloudinary(medicalRecordFiles[i]);
//         medicalRecordPhotos.push(medicalRecordPhoto.url);
//       }
  
//       req.body.medicalRecord = medicalRecordPhotos;
  
//       const pet = await Pet.create(req.body);
//       const profile = await Profile.findByIdAndUpdate(
//         req.user.profile,
//         { $push: { pets: pet } },
//         { new: true }
//       );
  
//       pet.owner = profile;
//       res.status(201).json(pet);
//     } catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//     }
//   };
  
  // Function to upload photo to Cloudinary (similar to addPhoto)
//   const uploadToCloudinary = (file) => {
//     return new Promise((resolve, reject) => {
//       cloudinary.uploader.upload(file.path, { tags: `${req.user.email}` })
//         .then((result) => resolve(result))
//         .catch((error) => reject(error));
//     });
//   };
  

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
            // req.body,
            { ...req.body, medicalRecord: req.body.medicalRecord },
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

function addPhoto (req, res){
    const imageFile = req.files.image.path
    Pet.findById(req.params.id)
    .then(pet => {
      cloudinary.uploader.upload(imageFile, {tags: `${req.user.email}`})
       .then(image => {
        pet.image = image.url
        pet.save() 
        .then(pet => {
        res.status(201).json(pet.image)
        })
        })
       .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
 })
}

// const addMedicalRecordPhotos = async (req, res) => {
//     try {
//       const pet = await Pet.findById(req.params.id);
  
//       // Handle medical record photos
//       const medicalRecordFiles = req.files.medicalRecord;
//       const medicalRecordPhotos = [];
  
//       for (let i = 0; i < medicalRecordFiles.length; i++) {
//         const medicalRecordPhoto = await uploadToCloudinary(medicalRecordFiles[i]);
//         medicalRecordPhotos.push(medicalRecordPhoto.url);
//       }
  
//       pet.medicalRecord = [...pet.medicalRecord, ...medicalRecordPhotos];
//       await pet.save();
  
//       res.status(200).json(pet);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   };
  

module.exports = {
    create,
    index,
    show,
    update,
    deletePet,
    addPhoto
}