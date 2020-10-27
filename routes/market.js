module.exports = (app) => {
    console.log(app);
    const { market } = app.controllers;
    const { verifyJWT } = app.middlewares.authenticate;

    app.get('/markets/', verifyJWT, market.markets);
    app.get('/market/:id', verifyJWT, market.findOneMarket);
    app.post('/market/:id/product', verifyJWT, market.createProduct);
}