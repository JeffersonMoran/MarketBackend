module.exports = (app) => {
    const { user } = app.controllers;
    const { verifyJWT } = app.middlewares.authenticate;

    app.post('/user/', user.register);
    app.post('/user/login', user.signIn);
    app.get('/user/products', verifyJWT, user.myProducts);
    app.post('/user/rate', verifyJWT, user.makeRate);
    app.post('/user/add-buy-list', verifyJWT, user.addToBuyList);
    app.delete('/user/remove-buy-list/product/:id', verifyJWT, user.removeFromBuyList);
    app.get('/user/buy-list', verifyJWT, user.listBuyList);
}