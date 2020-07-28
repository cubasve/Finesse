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

// function create(req, res, next) {
//     const financialStatement = FinancialStatement.create(req.body);
//     console.log(financialStatement) //Promise {undefined}
//     try {
//         // console.log(req.body); //[ ]
//         financialStatement.save();
//         console.log(financialStatement)
//         res.json({ financialStatement: financialStatement })
//     } catch (err) {
//         res.json({ err });
//         console.error(err);
//         console.log('ERROR: CONTROLLER FN CREATE')
//     }
// }

function create(req, res, next) {
    try {
        FinancialStatement.create(req.body);
        console.log(req.body); //console.log working
    } catch (err) {
        res.json({ err });
        console.error(err)
        console.log('ERROR: CONTROLLER FN CREATE')
    }
}