const mongoose = require('mongoose');

module.exports = (app) => {
    const MarketSchema = mongoose.Schema({
        cnpj: { type: String, default: "" },
        latitude: { type: String, default: "" },
        longitude: { type: String, default: "" },
        imagem: { type: String, default: "" },
        nome: { type: String, default: "" }
    }, {
            timestamps: true
        });
    return mongoose.model('Market', MarketSchema)
}
