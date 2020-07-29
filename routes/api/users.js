const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/users');

//Public Routes
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);

//Protected Routes
router.get('/', isLoggedIn, usersCtrl.show); //route: /api/financialStatements/

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({ msg: 'Not Authorized' });
}

