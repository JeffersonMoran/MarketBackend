module.exports = app => {
    const { Market, Rating, Product } = app.models;

    const listMarkets = async (where = {}) => {
        return await Market.find(where);
    }

    const findMarket = async (where = {}, user_id = null) => {
        let market = await Market.findOne(where);

        if (market == null) return null;
        const find_rating = await Rating.findOne({ market: market.id, user: user_id });
        const rates = await Rating.find({ market: market.id });

        let sum = 0;
        if (rates.length > 0) sum = rates.reduce( ( sum, { value } ) => sum + value, 0) / rates.length;

        return {
            ...market.toObject(),
            rates: sum,
            is_rated: find_rating != null ? true : false
        }
    }
    
    const addProduct = async (data) => {
        const new_product_added = new Product({ ...data });
        const product_added = await new_product_added.save();

        return product_added;
    }
    
    return { listMarkets, findMarket, addProduct }
}