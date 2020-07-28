const FinancialStatement = require('../models/financialStatement');
const User = require('../models/user');
// const userService = require('../src/utils/userService');
//import userService from '../../utils/userService';

module.exports = {
    create,
}

//POST /api/financialstatements 200 4.967 ms - 143
//Updated [totalEarnedIncome] 
async function create(req, res) {
    const financialStatement = new FinancialStatement(req.body);
    financialStatement.user = req.user._id;
    financialStatement.income = req.body;
    // financialStatement.income.type = req.user._id;
    // financialStatement.income.amount = req.user._id;
    // const user = userService.getUser();
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