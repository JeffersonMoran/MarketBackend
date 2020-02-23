const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const authenticate = require('../middleware/authenticate');

// middleware that is specific to this router
// define the home page route
router.post('/', userCtrl.signUp);

module.exports = router;