const mongoose = require('mongoose');

module.exports = (app) => {
    const RatingSchema = new mongoose.Schema({
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        market: { type: mongoose.Schema.Types.ObjectId, ref: 'Market' },
        value: { type: Number, default: 0 }
    }, {
            timestamps: true
        });

    return mongoose.model('Rating', RatingSchema)
}