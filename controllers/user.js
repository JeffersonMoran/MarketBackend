
module.exports = (app) => {
    const { user, listProducts } = app.services;
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

    const myProducts = async (req, res) => {
        try {
            const { user_id } = req;
            const products = await user.listProducts(user_id);
            return res.json(products);
        } catch (error) {
            console.log(error);
            const { message } = error;
            return res.status(500).send({ message });
        }
    }

    const makeRate = async (req, res) => {
        try {
            const { user_id } = req;
            const { market_id, value } = req.body;

            const product = await user.findRating(user_id, market_id);

            if (product) throw Error('Mercado ja avaliado.');

            const products = await user.rating({ market: market_id, user: user_id, value });
            return res.json(products);
        } catch (error) {
            console.log(error);
            const { message } = error;
            return res.status(500).send({ message });
        }
    }

    return { register, signIn, myProducts, makeRate }
}