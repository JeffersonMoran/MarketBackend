require('dotenv').config();
const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB
} = process.env;

module.exports = () => {
    const mongoose = require('mongoose');

    let connectionString = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

    let connectionData = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    mongoose.Promise = require('bluebird');

    mongoose.connect(connectionString, connectionData).then(() => {
        console.log("Successfully connected to the database");
    }).catch(err => {
        console.log('Could not connect to the database.');
        console.log(err)
        process.exit();
    });
}