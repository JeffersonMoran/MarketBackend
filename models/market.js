const mongoose = require('mongoose');

const MarketSchema = mongoose.Schema({
    email: { type: String, default: "" },
    password: { type: String, default: "" },
    cnpj: { type: String, default: "" },
    latitude: { type: String, default: "" },
    longitude: { type: String, default: "" },
    image: { type: String, default: "" },
    name: { type: String, default: "" }
}, {
    timestamps: true
});

module.exports = mongoose.model('Market', MarketSchema);