const express = require('express');
const router = express.Router();
const Place = require('../model/Place');


//get back all the places
router.get('/', async (req, res) => {
    try {
        const places = await Place.find();
        res.json(places);
    }
    catch (err) {
        res.json({message: err});
    }
});

//submits a places
router.post('/', async (req, res) => {
    const place = new Place({
        name: req.body.name,
        img: req.body.img,
        address: req.body.address,
        description: req.body.description,
        category: req.body.category,
        position: req.body.position,
    });
        try {
            const savedPlace = await place.save();
            res.json(savedPlace);
        }
        catch(err){
            res.json({message: err});
        }
});

//specific place
router.get('/:placeId', async (req, res) => {
    try{
        const place = await Place.findById(req.params.placeId);
        res.json(place);
    }
    catch (err){
        res.json({message: err});
    }
});

//delete place
router.delete('/:placeId', async (req, res) => {
    try{
        const removedPlace = await Place.remove({ _id: req.params.placeId });
        res.json(removedPlace);
    }
    catch (err){
        res.json({message: err});
    }
});

//update place
// router.patch('/:placeId', async (req, res) => {
//     try{
//         const updatedPlace = await Place.updateOne(
//             { _id: req.params.pId },
//             { $set: {name: req.body.name }}
//         );
//         res.json(updatedDish);
//     }
//     catch (err){
//         res.json({message: err});
//     }
//     });

module.exports = router;