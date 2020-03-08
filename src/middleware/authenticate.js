const jwt = require('jsonwebtoken');
const User = require('.../models/user');

exports.verifyJWT = (req, res, next) => {
    let token = req.headers['authorization'];

    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trimLeft();
    } else {
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    }

    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        req.user = await User.findOne({ _id: decoded._id});

        next();
    });
}
