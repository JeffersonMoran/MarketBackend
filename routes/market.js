module.exports = (app) => {
    const { market } = app.controllers;

    app.get('/markets/', market.markets);
    app.get('/market/:id', market.findOneMarket);
}