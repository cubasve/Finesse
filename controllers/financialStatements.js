const FinancialStatement = require('../models/financialStatement');

module.exports = {
    create,
}

function create(req, res, next) {
    const financialStatement = FinancialStatement.create(req.body);
    try {
        console.log(req.body);
        financialStatement.save();
        res.json({ financialStatement: financialStatement })
    } catch (err) {
        res.json({ err });
        console.log('Error occurred with creating')
    }
}
