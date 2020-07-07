
module.exports = (app) => {
    const { user } = app.controllers;

    app.post('/user/', user.register);
    app.post('/user/login', user.signIn);
}