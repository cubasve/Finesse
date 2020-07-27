const FinancialStatement = require('../models/financialStatement');

module.exports = {
    create,
}

async function create(req, res) {
    try {
        await FinancialStatement.create(req.body);
    } catch (err) {
        res.json({ err });
    }
}