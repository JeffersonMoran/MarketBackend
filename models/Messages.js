const mongoose = require('mongoose');

module.exports = (app) => {
    const MessageSchema = mongoose.Schema({
        title: { type: String, default: "" },
        message: { type: String, default: "" },
        status: { type: String, default: "pending" },
        date: { type: Number, default: 0 },
        users: [String]
    }, {
            timestamps: true
        });

    return mongoose.model('Message', MessageSchema)
}