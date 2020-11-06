
module.exports = (app) => {
    const { user, listProducts } = app.services;
    const { User } = app.models;

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

    const addToBuyList = async (req, res) => {
        try {
            const { user_id } = req;
            const { product_id } = req.body;

            const user = await User.findOne({ _id: user_id });

            console.log(user);
            if (user.buy_list.includes(product_id)) throw Error('Produto ja na lista de compra');
            user.buy_list.push(product_id);
            await user.save();
            return res.json({ "success": true });
        } catch (error) {
            console.log(error);
            const { message } = error;
            return res.status(500).send({ message });
        }
    }

    const removeFromBuyList = async (req, res) => {
        try {
            const { user_id } = req;
            const { id } = req.params;
            
            const user = await User.findOne({ _id: user_id });
            if(!user.buy_list.includes(id.toString())) throw Error('Produto nao esta na lista de compra');
        
            user.buy_list = user.buy_list.filter(product => product != id);
            await user.save();
            return res.json({ "success": true });
        } catch (error) {
            console.log(error);
            const { message } = error;
            return res.status(500).send({ message });
        }
    }

    const listBuyList = async (req, res) => {
        try {
            const { user_id } = req;
            const user = await User.findOne({ _id: user_id }).populate('buy_list', '-__v');
            res.json(user.buy_list)
        } catch (error) {
            console.log(error);
            const { message } = error;
            return res.status(500).send({ message });
        }
    }

    return { register, signIn, myProducts, makeRate, addToBuyList, removeFromBuyList, listBuyList }
}