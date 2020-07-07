
module.exports = (app) => {
    const { user } = app.services;
    const register = async (req, res) => {
        try {
            const { name, image, password, email, player_id } = req.body;
            const savedUser = await user.signUp({ name, image, password, email, player_id });
            res.json(savedUser);
        } catch (error) {
            const { message } = error;
            res.status(500).send({ message });
        }
    }
    
    const signIn = async (req, res) => {
        try {
            const { email, password } = req.body;
            const user_login = await user.login({ email, password });
            res.json(user_login);
        } catch (error) {
            console.log(error);
            const { message } = error;
            res.status(500).send({ message });
        }
    }

    return { register, signIn }
}