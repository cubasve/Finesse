const User = require('../mdoels/user');

module.exports = {
    signup,
    login,
}

async function signup() {
    const user = new User(req.body);
    try {
        await user.save();
        //TODO: Send back a JWT instead of the user
        res.json(user);
    } catch (err) {
        //Probably a duplicate email
        res.status(400).json(err);
    }
}

function login() {

}