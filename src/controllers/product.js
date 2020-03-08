const Product = require('../models/product')

exports.create = async (req, res) => {
    try {
        await validateMarket(req.body);

        const newMarket = new Market({ ...req.body });
        res.json(newMarket);
    } catch (error) {
        const { message } = error;
        res.status(500).send({ message });
    }
}

exports.delete = async (req, res) => {
    try {
        const{ id } = req.params;
        const marketDeleted = Market.findOneAndDelete({ _id: id });

        res.json(marketDeleted);
    } catch (error) {
        const { message } = error;
        res.status(500).send({ message });
    }
}

exports.setPromotionalProduct = async (req, res) => {
    try {
        const{ id } = req.params;
        const promotionalProduct = Product.findOneAndUpdate({ _id: id }, { isPromotional: true });

        res.json(promotionalProduct);
    } catch (error) {
        const { message } = error;
        res.status(500).send({ message });
    }
}

validateProduct = async ({ name, image, price, bar_code, market,...other }) => {
    const product = Product.findOne({ name, price, market })
    if (product) {
        throw new Error("Produto ja inserido para o mercado.");
    }

    return Product.validate({ name, image, price, bar_code, market,...other })
}

