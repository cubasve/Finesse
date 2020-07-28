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

//THIS FUNCTION WORKS
// function create(req, res, next) {
//     try {
//         FinancialStatement.create(req.body);
//         console.log(req.body); //console.log working
//     } catch (err) {
//         res.json({ err });
//         console.error(err)
//         console.log('ERROR: CONTROLLER FN CREATE')
//     }
// }

//THIS GIVES ME Mongoose objects
// function create(req, res, next) {
//     try {
//         const financialStatement = new FinancialStatement(req.body);
//         console.log(req.body);
//         financialStatement.save(err => {
//             if (err) return next(err);
//             console.log(financialStatement);
//         })
//         // FinancialStatement.create(req.body);
//         // FinancialStatement.save(req.body);
//         // console.log(req.body); //console.log working
//     } catch (err) {
//         res.json({ err });
//         console.error(err)
//         console.log('ERROR: CONTROLLER FN CREATE')
//     }
// }


//POST /api/financialstatements 200 4.967 ms - 143
//Updated [totalEarnedIncome] 
async function create(req, res) {
    const financialStatement = new FinancialStatement(req.body);
    try {
        await financialStatement.save();
        console.log(req.body);
        console.log(financialStatement);
        res.json({ financialStatement: financialStatement });
    } catch (err) {
        res.json({ err })
        console.error(err)
        console.log('ERROR: CONTROLLER FN CREATE')
    }
}