module.exports = (app) => {
    const { User } = app.models;

    const signUp = async (new_user) => {
        try {
            await findOneByEmail(new_user.email);

            const user = new User(new_user);

            const userSaved = await user.save();
            const tokens = await user.makeJWT(userSaved);
            const returnUser = await returnInfos(userSaved);
            return  { ...returnUser, ...tokens }
        } catch (error) {
            throw error;
        }
    }
    
    const login = async ({ email, player_id, password }) => {
        try {
            const user = await User.findOne({ email });
            if (user) {
                const valid = await user.comparePassword(password.trim(), user.password);
                if (valid) {
                    player_id = !!player_id ? player_id : user.player_id;
                    const foundUser = await User.findOneAndUpdate({ email }, { $set: { player_id } });
                    const infos = await returnInfos(foundUser);

                    const tokens = await foundUser.makeJWT(foundUser);
                    return { ...infos, ...tokens};
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

    return { findOneByEmail, returnInfos, login, signUp}
}