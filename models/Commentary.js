const mongoose = require('mongoose');

module.exports = (app) => {
    const CommentSchema = new mongoose.Schema({
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        market: { type: mongoose.Schema.Types.ObjectId, ref: 'Market' },
        text: { type: String, default: "" }
    }, {
        timestamps: true
    });

    return mongoose.model('Comment', CommentSchema)
}