const User = require('../models/user');

exports.signUp = async (req, res) => {
    try {
        await findOneByEmail(req.body.email);
        const user = new User(req.body);
        const userSaved = await user.save();
        const tokens = await user.makeJWT(userSaved);
        return res.json({ ...userSaved.toObject(), ...tokens });
    } catch (error) {
        const { message } = error;
        res.status(500).send({ message });
    }
}

exports.login = async (req, res) => {
    try {
        const { email } = req.body;
        let { player_id } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            const valid = await user.comparePassword(req.body.password.trim(), user.password);
            if (valid) {
                player_id = !!player_id ? player_id : user.player_id;
                const foundUser = await User.findOneAndUpdate({ email }, { $set: { player_id } });
                const infos = await returnInfos(foundUser);
                const tokens = foundUser.makeJWT(foundUser);
                return res.json({ ...infos, ...tokens});
            }
        }
        res.status(500).send({ message: "Can't login." });
    } catch (error) {
        const { message } = error;
        res.status(500).send({ message });
    }
}

returnInfos = async (user) => {
    const { email, name, image, buy_list } = user;
    return {
        email, name, image, buy_list
    }
}

findOneByEmail = async (email) => {
    const sanitizeEmail = email.trim();
    const foundUser = await User.findOne({ email: sanitizeEmail });
    if (foundUser) {
        throw new Error("Usuario ja existe.");
    }
}