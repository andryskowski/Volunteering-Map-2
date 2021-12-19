const mongoose = require('mongoose');

const today = new Date();
today.setHours(today.getHours() + 1);

const commentSchema = new mongoose.Schema({
    authorId: String,
    subject: String,
    message: String,
    date: {
        type: Date,
        default: today.toISOString()
    },
    placeId: String,
});

module.exports = mongoose.model('Comment', commentSchema);
