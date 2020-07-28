const express = require('express');
const router = express.Router();
const financialStatementsCtrl = require('../../controllers/financialStatements');

//In server.js:
//app.use('/api/financialStatements', require('./routes/api/financialStatements'));

router.get('/', isLoggedIn, financialStatementsCtrl.show); //route: /api/financialStatements
router.post('/', isLoggedIn, financialStatementsCtrl.create); //route: /api/financialStatements/


module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({ msg: 'Not Authorized' });
}