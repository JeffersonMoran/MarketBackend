module.exports = (app) => {
    const { User, Product, Rating } = app.models;
    const { email_regex } = app.utils.regex;

    const signUp = async (new_user) => {
        try {
            if (!email_regex(new_user.email)) throw new Error('Need a valid email.');
            await findOneByEmail(new_user.email);

            const user = new User(new_user);

            const userSaved = await user.save();
            const tokens = await user.makeJWT(userSaved);
            const returnUser = await returnInfos(userSaved);
            return { ...returnUser, ...tokens }
        } catch (error) {
            throw error;
        }
    }

    const login = async ({ email, player_id, password }) => {
        try {
            if (!email_regex(email)) throw new Error('Need a valid email.');
            const user = await User.findOne({ email });
            if (user) {
                const valid = await user.comparePassword(password.trim(), user.password);
                if (valid) {
                    player_id = !!player_id ? player_id : user.player_id;
                    const foundUser = await User.findOneAndUpdate({ email }, { $set: { player_id } });
                    const infos = await returnInfos(foundUser);

                    const tokens = await foundUser.makeJWT(foundUser);
                    return { ...infos, ...tokens };
                }
            }
            throw Error("Can't login.");
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const returnInfos = async (user) => {
        const { email, name, image, buy_list } = user;
        return {
            email, name, image, buy_list
        }
    }

    const findOneByEmail = async (email) => {
        const sanitizeEmail = email.trim();

        const foundUser = await User.findOne({ email: sanitizeEmail });

        if (foundUser) {
            throw new Error("Usuario ja existe.");
        }

        return null;
    }

    const listProducts = async (user_id) => {
        return await Product.find({ created_by: user_id, created_by: { $ne: null } });
    }

    const findRating = async (user_id, market_id) => {
        return await Rating.findOne({ user: user_id, market: market_id })
    }

    const rating = async (data) => {
        const rating = new Rating({ ...data });
        return await rating.save();
    }

    return { findOneByEmail, returnInfos, login, signUp, listProducts, rating, findRating }
}