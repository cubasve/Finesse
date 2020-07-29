const FinancialStatement = require('../models/financialStatement');
const User = require('../models/user');

module.exports = {
    create,
    // update,
    // delete: deleteOne,
}

//POST /api/financialstatements 200 
//Updated [totalEarnedIncome] 
// function create(req, res) {
//     const financialStatement = new FinancialStatement(req.body);
//     //added below 2 lines
//     // financialStatement.user = req.user._id;
//     // financialStatement.income = req.body._id;
//     try {
//         financialStatement.save();
//         console.log(req.body);
//         // console.log(financialStatement);
//         res.json({ financialStatement: financialStatement });
//     } catch (err) {
//         res.status(400).json(err);
//         console.error(err)
//         console.log('ERROR: CONTROLLER FN CREATE')
//     }
// }


function create(req, res) {
    // const doc = req.user.userFinances.id(_id);
    // console.log(doc)
    console.log(req.user)
    console.log(req.user.userFinances)
    // console.log(userFinances)
    let user = new User({ userFinances: [{ 'type': req.body.type, 'amount': req.body.amount }] })
    try {
        user.save();
        console.log(req.body);
        res.json({ user: user })
    } catch (err) {
        res.status(400).json(err);
        console.error(err)
        console.log('ERR: CREATE FN')

    }
    // try {
    //     req.user.userFinances.push({ type: req.body.type, amount: req.body.amount });
    //     req.user.save();
    //     res.json({ userFinances });
    // } catch (err) {
    //     res.status(400).json(err);
    //     console.error(err);
    //     console.log('ERR: CREATE FN')
    //     console.log(req.body)

    // }
}

// function update(req, res) {
//     try {
//         FinancialStatement.findOneAndUpdate({ 'income': req.body.income });
//         res.json({ income: income })
//     } catch (err) {
//         res.status(400).json(err);
//     }
// }

function update(req, res) {
    const user = User.findById({ _id: req.user._id });
    try {
        const userFinance = req.user.userFinances.id({ _id: userFinances._id });
        userFinance.set({ 'type': req.body.type, 'amount': req.body.amount });
        user.save()
        res.send({ user: user })
    } catch (err) {
        res.status(400).json(err);
        console.error(err)
        console.log('ERR: UPDATE FN')

    }
}

function deleteOne(req, res) {
    try {
        req.user.userFinances.remove(req.params.id); //req.user.userFinances.pull(req.params.id)
        //req.user.userFinances.id(_id).remove();
        req.user.save();
        res.json({ user: user });
    } catch (err) {
        res.status(400).json(err);
        console.error(err);
        console.log('ERR: DELETE FN')
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