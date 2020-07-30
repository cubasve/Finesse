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
        console.error(err);
        console.log('ERR: SHOW FN')
        return res.status(400).json(err);
    }
}

async function create(req, res) {
    try {
        const user = await User.findById({ _id: req.user._id });
        //req.user = user you get back from token VS user = User.findById(...) is the user document from Mongoose 
        user.userFinances.push({ 'type': req.body.type, 'amount': req.body.amount, 'category': req.body.category })
        console.log(user)
        console.log(user.userFinances)
        console.log(req.body)
        await user.save();
        res.json({ user: user });
    } catch (err) {
        console.error(err);
        console.log('ERR: CREATE FN');
        return res.status(400).json(err);
    }
}

async function update(req, res) {
    try {
        const user = await User.findById({ _id: req.user._id });
        const id = user.userFinances.id(req.body.id);
        console.log(id);
        id.set({ 'type': req.body.type, 'amount': req.body.amount })
        await user.save();
        res.json({ user: user });
    } catch (err) {
        console.error(err);
        console.log('ERR: UPDATE FN');
        return res.status(400).json(err);
    }
}

async function deleteOne(req, res) {
    try {
        const user = await User.findById({ _id: req.user._id });
        const id = user.userFinances.id(req.body.id);
        console.log(id)
        id.remove(); //or just req.body.id
        //id.pull(req.body)
        // await user.save();
        res.json({ user: user });
    } catch (err) {
        console.error(err);
        console.log('ERR: DELETE FN');
        return res.status(400).json(err);
    }
}


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
