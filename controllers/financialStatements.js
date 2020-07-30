const User = require('../models/user');

module.exports = {
    show,
    create,
    update,
    deleteOne,
}

async function show(req, res) {
    try {
        const user = await User.findById({ _id: req.user._id }); //req.body._id OR req.user._id?
        return res.json({ user: user });//explicitly return to fetch call 
    } catch (err) {
        res.status(400).json(err);
        console.error(err);
        console.log('ERR: SHOW FN')
    }
}

async function create(req, res) {
    try {
        const user = await User.findById({ _id: req.user._id });
        //req.user = user you get back from token VS user = User.findById(...) is the user document from Mongoose 
        user.userFinances.push({ 'type': req.body.type, 'amount': req.body.amount })
        console.log(user)
        console.log(user.userFinances)
        console.log(req.body)
        await user.save();
        res.json({ user: user });
    } catch (err) {
        return res.status(400).json(err);
        console.error(err);
        console.log('ERR: CREATE FN');
    }
}

async function update(req, res) {
    try {
        const user = await User.findById({ _id: req.user._id });
        user.userFinances.set({ 'type': req.body.type, 'amount': req.body.amount })
        console.log(user)
        console.log(user.userFinances)
        console.log(req.body)
        await user.save();
        res.json({ user: user });
    } catch (err) {
        return res.status(400).json(err);
        console.error(err);
        console.log('ERR: UPDATE FN');

    }
}

async function deleteOne(req, res) {
    try {
        const user = await User.findById({ _id: req.user._id });
        user.userFinances.remove(req.params.id);
        console.log(user.userFinances);
        // await user.save();
        res.json({ user: user });

    } catch (err) {
        return res.status(400).json(err);
        console.error(err);
        console.log('ERR: DELETE FN');
    }
}

// function update(req, res) {
//     try {
//         FinancialStatement.findOneAndUpdate({ 'income': req.body.income });
//         res.json({ income: income })
//     } catch (err) {
//         res.status(400).json(err);
//     }
// }

// function update(req, res) {
//     const user = User.findById({ _id: req.user._id });
//     try {
//         const userFinance = req.user.userFinances.id({ _id: userFinances._id });
//         userFinance.set({ 'type': req.body.type, 'amount': req.body.amount });
//         user.save()
//         res.send({ user: user })
//     } catch (err) {
//         res.status(400).json(err);
//         console.error(err)
//         console.log('ERR: UPDATE FN')

//     }
// }

// function deleteOne(req, res) {
//     try {
//         req.user.userFinances.remove(req.params.id); //req.user.userFinances.pull(req.params.id)
//         //req.user.userFinances.id(_id).remove();
//         req.user.save();
//         res.json({ user: user });
//     } catch (err) {
//         res.status(400).json(err);
//         console.error(err);
//         console.log('ERR: DELETE FN')
//     }
// }
