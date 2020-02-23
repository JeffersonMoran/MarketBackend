const jwt = require('jsonwebtoken');

exports.verifyJWT = (req, res, next) => {
    let token = req.headers['authorization'];

    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trimLeft();
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        req.user_id = decoded._id;

        next();
    });
}

exports.verifyJwtNoBlock = (req, res, next) => {
    let token = req.headers['authorization'];

    if (!token) {
        next();
    } else {
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length).trimLeft();
        }

        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            req.user_id = decoded._id;

            next();
        });
    }
}