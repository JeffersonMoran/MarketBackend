const Market = require('../models/market')

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

validateMarket = async ({ latitude, longitude, name, ...other }) => {
    const foundMarket = Market.findOne({ latitude, longitude, name })
    if (foundMarket) {
        throw new Error("Ja existe um mercado registrado.");
    }

    return Market.validateMarket({ latitude, longitude, name, other })
}

