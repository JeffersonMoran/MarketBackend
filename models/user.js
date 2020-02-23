const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: { type: String, default: "" },
    image: { type: String, default: "" },
    email: { type: String, default: "", require: true, unique: true },
    password: { type: String, default: "" },
    type: { type: String, default: "user" },
    buy_list: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);