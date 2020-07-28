const express = require('express');
const router = express.Router();
const financialStatementsCtrl = require('../../controllers/financialStatements');

// router.post('/', require('../../config/auth'), isLoggedIn, financialStatementsCtrl.create);

//In server.js:
//app.use('/api/financialStatements', require('./routes/api/financialStatements'));

router.post('/', isLoggedIn, financialStatementsCtrl.create); //route: /api/financialStatements/

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({ msg: 'Not Authorized' });
}