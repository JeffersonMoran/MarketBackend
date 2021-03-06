module.exports = app => {
    const { listMarkets, findMarket, addProduct } = app.services.market;
    const { Product } = app.models;
    const { listProducts } = app.services.product;

    const markets = async (req, res) => {
        try {
            const found_markets = await listMarkets({});
            res.json(found_markets);
        } catch (error) {
            console.log(error);
            const { message } = error;
            res.status(500).send({ message });
        }
    }

    const findOneMarket = async (req, res) => {
        try {
            const { id } = req.params;
            if (id == null) throw new Error("Couldn't find the market.");

            const market = await findMarket({ _id: id });
            if (market == null) throw new Error("Couldn't find the market.");
            const products = await listProducts({ market: market._id });

            res.json({ ...market, products });
        } catch (error) {
            console.log(error);
            const { message } = error;
            res.status(500).send({ message });
        }
    }

    const createProduct = async (req, res) => {
        try {
            const { id } = req.params;
            const { user_id } = req;

            const product_found = await listProducts({ market: id, nome: req.body.nome, descricao: req.body.descricao });
            if (product_found.length > 0) throw Error('Produto ja cadastrao para esse mercado.');
            const product = await addProduct({ market: id, created_by: user_id, ...req.body });
            return res.json(product);
        } catch (error) {
            console.log(error);
            const { message } = error;
            return res.status(500).send({ message });
        }
    }

    const getProduts = async (req, res) => {
        try {
            const { search } = req.query;

            const uniqueProducts = [];
            const ids = [];
            const products = await Product.find({ nome: { $regex: '.*' + search.toLowerCase() + '.*',  "$options" : "i" } })
                        .populate('market');

            products.map(product => {
                if (!ids.includes(product.nome)) {
                    uniqueProducts.push(product);
                    ids.push(product.nome);
                }
            });

            return res.json(uniqueProducts);
        } catch (error) {
            console.log(error);
            const { message } = error;
            return res.status(500).send({ message });
        }
    }

    return { markets, findOneMarket, createProduct, getProduts }
}