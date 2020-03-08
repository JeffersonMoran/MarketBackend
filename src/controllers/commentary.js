const Comment = require('../models/rating')

exports.create = async (req, res) => {
    try {
        const { user } = req;
        const { market, text } = req.body;

        await validateMessage({ market, text });
        const ratingSaved = await Comment.findOneAndUpdate({ user, market }, { text }, { new: true, upsert: true });
        res.json(ratingSaved);
    } catch (error) {
        const { message } = error;
        res.status(500).send({ message });
    }
}

exports.answer = async (req, res) => {
    try {
        const { user } = req;
        const { id } = req.params;
        const { market, text } = req.body;

        await validateMessage({ market, value });
        const commentSaved = new Comment({ user, text, market, related_comment: id });
        const savedComment = await commentSaved.save();
        res.json(savedComment);
    } catch (error) {
        const { message } = error;
        res.status(500).send({ message });
    }
}

exports.delete = async (req, res) => {
    try {
        const { user } = req;
        const { id } = req.params;

        const messageDeleted = await Comment.findByIdAndDelete({ user, _id: id });

        if(messageDeleted === null) {
            res.status(500).send("Nao foi possivel deletar a mensagem.");
        }
        res.json(messageDeleted);
    } catch (error) {
        const { message } = error;
        res.status(500).send({ message });
    }
}

validateMessage = async ({ market, text }) => {
    if (market === '' || text === '') {
        throw Error("Por favor selecione um mercado valido e uma mensagem.");
    }
    return true;
}

