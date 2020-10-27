const mongoose = require('mongoose');


module.exports = (app) => {
    const ProductSchema = new mongoose.Schema({
        nome: { type: String, default: "" },
        imagem: { type: String, default: "" },
        preco: { type: Number, default: 0 },
        descricao: { type: String, default: "" },
        promocao: { type: Boolean, default: false },
        created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
        market: { type: mongoose.Schema.Types.ObjectId, ref: 'Market' }
    }, {
            timestamps: true
        });

    return mongoose.model('Product', ProductSchema)
}
