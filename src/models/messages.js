const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    title: { type: String, default: "" },
    message: { type: String, default: "" },
    status: { type: String, default: "pending" },
    date: { type: Number, default: 0 },
    users: [String]
}, {
    timestamps: true
});

module.exports = mongoose.model('Message', MessageSchema);