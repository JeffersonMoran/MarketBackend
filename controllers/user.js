const User = require('../models/user');

exports.signUp = async (req, res) => {
    try {
        console.log(req.body);
        await findOneByEmail(req.body.email);
        const user = new User(req.body);
        const userSaved = await user.save();

        return res.json(userSaved);
    } catch (error) {
        const { message } = error;
        res.status(500).send({ message });
    }
}

findOneByEmail = async (email) => {
    const sanitizeEmail = email.trim();
    const foundUser = await User.findOne({ email: sanitizeEmail });
    if (foundUser) {
        throw new Error("Usuario ja existe.");
    }

    return false;
}