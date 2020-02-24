const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    market: { type: mongoose.Schema.Types.ObjectId, ref: 'Market' },
    value: { type: Number, default: 0 }
}, {
    timestamps: true
});

module.exports = mongoose.model('Rating', RatingSchema);