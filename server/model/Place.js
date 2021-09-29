const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    name: String,
    img: String,
    description: String,
    category: String,
    position: Object,
    phone: String,
    email: String,
    webPage: String,
    city: String,
    street: String,
    postalCode: String,
    houseNo: String,
    district: String,
    smallMapOfPlace: String,
    statusPlace: String,
    addedBy: String,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Place', placeSchema);
