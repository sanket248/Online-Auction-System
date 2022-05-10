const mongoose = require('mongoose');

const bidSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    price: {
        type: Number,
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Bid', bidSchema);