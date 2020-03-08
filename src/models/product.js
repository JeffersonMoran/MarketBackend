const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, default: "" },
    image: { type: String, default: "" },
    price: { type: Number, default: 0 },
    description: { type: String, default: "" },
    isPromotional: { type: Boolean, default: false },
    bar_code: { type: String, default: "" },
    market: { type: mongoose.Schema.Types.ObjectId, ref: 'Market' }
}, {
    timestamps: true
});

ProductSchema.methods.validate = async ({ name, image, price, market }) => {
    if (name === '', image === '', price <= 0, market === '') {
        throw Error("Porfavor insira corretamente as informaçoes.");
    }

    return true;
};

module.exports = mongoose.model('Product', ProductSchema);