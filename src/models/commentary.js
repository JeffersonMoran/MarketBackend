const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    market: { type: mongoose.Schema.Types.ObjectId, ref: 'Market' },
    related_comment: { type: String, default: "" }, 
    text: { type: String, default: "" }
}, {
    timestamps: true
});

module.exports = mongoose.model('Comment', CommentSchema);