const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    authorId: String,
    subject: String,
    message: String,
    date: {
        type: Date,
        default: Date.now
    },
    placeId: String,
});

module.exports = mongoose.model('Comment', commentSchema);
