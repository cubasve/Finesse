const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = {
    signup
};

async function signup(req, res) {
    const user = new User(req.body);
    try {
        await user.save();
        // First delete data that should not be in token
        const token = createJWT(user);
        res.json({ token });
    } catch (err) {
        // Probably a duplicate email
        res.status(400).json(err);
    }
}

function createJWT(user) {
    return jwt.sign(
        { user },
        SECRET,
        { expiresIn: '24h' }
    );
}