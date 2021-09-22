const mongoose = require('mongoose');

const PlaceSchema = mongoose.Schema(
    {
        name: String,
        img: String,
        address: String,
        description: String,
        category: String,
        position: Array,
    }
);

module.exports = mongoose.model('Places', PlaceSchema);