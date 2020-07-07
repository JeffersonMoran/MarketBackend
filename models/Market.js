const mongoose = require('mongoose');

module.exports = (app) => {
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
    return mongoose.model('Market', MarketSchema)
}
