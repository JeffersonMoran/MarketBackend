module.exports = app => {
    const { listMarkets, findMarket } = app.services.market;
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
            if (market == null ) throw new Error("Couldn't find the market.");
            const products = await listProducts({ market: market._id });

            res.json({ ...market, products });
        } catch (error) {
            console.log(error);
            const { message } = error;
            res.status(500).send({ message });
        }
    }

    return { markets, findOneMarket }
}