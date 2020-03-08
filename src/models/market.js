const mongoose = require('mongoose');

const MarketSchema = mongoose.Schema({
    email: { type: String, default: "" },
    password: { type: String, default: "" },
    cnpj: { type: String, default: "" },
    latitude: { type: String, default: "" },
    longitude: { type: String, default: "" },
    image: { type: String, default: "" },
    name: { type: String, default: "" },
    promotion_schedule: { type: Number, default: 7 }
}, {
    timestamps: true
});

Market.methods.validateMarket = async ({ latitude, longitude, email, name }) => {
    if (latitude === '', longitude === '', email === '', name === '') {
        throw Error("Porfavor insira corretamente as informaçoes.")
    }
};

module.exports = mongoose.model('Market', MarketSchema);