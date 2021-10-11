const express = require('express');
const router = express.Router();
const Comment = require('../model/Comment');

//get back all the comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    }
    catch (err) {
        res.json({message: err});
    }
});

//get specific user
router.get('/:commentId', async (req, res) => {
    try{
        const comment = await Comment.findById(req.params.commentId);
        res.json(comment);
    }
    catch (err){
        res.json({message: err});
    }
  });

//submits a places
router.post('/post', async (req, res) => {
    const place = new Comment({
        author: req.body.author,
        subject: req.body.subject,
        message: req.body.message,
        placeId: req.body.placeId,
    });
        try {
            const savedPlace = await place.save();
            res.json(savedPlace);
        }
        catch(err){
            res.json({message: err});
        }
});

module.exports = router;