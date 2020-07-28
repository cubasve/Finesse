const FinancialStatement = require('../models/financialStatement');

module.exports = {
    create,
}

// async function create(req, res) {
//     try {
//         await FinancialStatement.create(req.body);
//         console.log(req.body)
//     } catch (err) {
//         res.json({ err });
//         console.error(err)
//         console.log('ERROR: CONTROLLER FN CREATE')
//     }
// }

function create(req, res, next) {
    const financialStatement = FinancialStatement.create(req.body);
    console.log(financialStatement)
    try {
        console.log(req.body); //console.log working
        financialStatement.save();
        res.json({ financialStatement: financialStatement })
    } catch (err) {
        res.json({ err });
        console.error(err);
        console.log('ERROR: CONTROLLER FN CREATE')
    }
}

// async function create(req, res, next) {
//     try {
//         await FinancialStatement.create(req.body);
//         console.log(req.body); //console.log working
//     } catch (err) {
//         res.json({ err });
//         console.error(err)
//         console.log('ERROR: CONTROLLER FN CREATE')
//     }
// }