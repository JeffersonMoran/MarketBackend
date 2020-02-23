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

module.exports = mongoose.model('Product', ProductSchema);