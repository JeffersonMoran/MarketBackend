const Rating = require('../models/rating')

exports.create = async (req, res) => {
    try {
        const { user } = req;
        const { market, value } = req.body;

        await validateRating({ market, value });
        const ratingSaved = await Rating.findOneAndUpdate({ user, market }, { value }, { new: true, upsert: true });
        res.json(ratingSaved)
    } catch (error) {
        const { message } = error;
        res.status(500).send({ message });
    }
}

validateRating = async ({ market, value }) => {
    if (market === '' || value <= 0) {
        throw Error("Por favor selecione um mercado valido e um valor entre 1-5.");
    }
    return true;
}

