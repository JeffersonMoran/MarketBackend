module.exports = app => {
    const { Product } = app.models;

    const listProducts = async (where = {}) => {
        console.log(where);
        return await Product.find(where);
    }

    const findProduct = async (where = {}) => {
        return await Product.findOne(where);
    }
    
    return { listProducts, findProduct }
}